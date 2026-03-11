interface Env {
  TALLY_WEBHOOK_SECRET?: string;
  MAILCHANNELS_API_KEY?: string;
  MAILCHANNELS_FROM_EMAIL?: string;
  RFQ_NOTIFICATION_TO?: string;
}

type UnknownRecord = Record<string, unknown>;
type FunctionContext<TEnv> = {
  env: TEnv;
  request: Request;
};
type PagesFunction<TEnv> = (context: FunctionContext<TEnv>) => Response | Promise<Response>;

const jsonResponse = (status: number, body: UnknownRecord) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });

const normalize = (value: unknown): string => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value.trim();
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (Array.isArray(value)) {
    return value
      .map((entry) => normalize(entry))
      .filter(Boolean)
      .join(', ');
  }
  if (typeof value === 'object') {
    const record = value as UnknownRecord;

    if (record.label) return normalize(record.label);
    if (record.value) return normalize(record.value);
    if (record.text) return normalize(record.text);
    return '';
  }

  return '';
};

const extractAnswerValue = (answer: UnknownRecord): string => {
  const directCandidates = [
    answer.value,
    answer.text,
    answer.email,
    answer.phone,
    answer.number,
    answer.date,
    answer.url,
    answer.answer,
  ];

  for (const candidate of directCandidates) {
    const normalized = normalize(candidate);
    if (normalized) return normalized;
  }

  const choice = normalize(answer.choice);
  if (choice) return choice;

  const choices = normalize(answer.choices);
  if (choices) return choices;

  return '';
};

const cleanKey = (key: string): string =>
  key
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const collectSubmissionFields = (payload: UnknownRecord): Record<string, string> => {
  const fieldMap: Record<string, string> = {};
  const payloadData = (payload.data ?? payload) as UnknownRecord;

  const assign = (rawKey: unknown, rawValue: unknown) => {
    const key = normalize(rawKey);
    const value = normalize(rawValue);
    if (!key || !value) return;

    const cleaned = cleanKey(key);
    if (cleaned) fieldMap[cleaned] = value;
  };

  const answerSources = [
    payloadData.answers,
    payloadData.fields,
    payload.answers,
    payload.fields,
  ];

  for (const source of answerSources) {
    if (!Array.isArray(source)) continue;

    for (const rawItem of source) {
      if (!rawItem || typeof rawItem !== 'object') continue;

      const item = rawItem as UnknownRecord;
      const field = (item.field ?? item) as UnknownRecord;
      const value = extractAnswerValue(item) || extractAnswerValue(field);
      if (!value) continue;

      assign(field.label, value);
      assign(field.key, value);
      assign(field.id, value);
      assign(item.label, value);
      assign(item.key, value);
      assign(item.id, value);
    }
  }

  const topLevelCandidates = [
    'company',
    'contact',
    'email',
    'whatsapp',
    'aog',
    'needed_by',
    'destination',
    'parts_list',
    'cert_requirement',
    'notes',
    'subject',
  ];

  for (const key of topLevelCandidates) {
    assign(key, payloadData[key]);
    assign(key, payload[key]);
  }

  return fieldMap;
};

const pickField = (fields: Record<string, string>, aliases: string[]): string => {
  for (const alias of aliases) {
    const cleanedAlias = cleanKey(alias);

    if (fields[cleanedAlias]) return fields[cleanedAlias];

    for (const [key, value] of Object.entries(fields)) {
      if (key.includes(cleanedAlias)) return value;
    }
  }

  return '';
};

const yesLike = (value: string): boolean => /^(yes|true|1|urgent|aog)$/i.test(value.trim());

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const toHtmlLineBreaks = (value: string): string => escapeHtml(value || 'N/A').replace(/\n/g, '<br/>');

export const onRequestPost: PagesFunction<Env> = async ({ env, request }) => {
  const expectedSecret = (env.TALLY_WEBHOOK_SECRET ?? '').trim();
  const incomingSecret = (request.headers.get('x-tally-secret') ?? '').trim();

  if (!expectedSecret || incomingSecret !== expectedSecret) {
    return jsonResponse(401, { ok: false, error: 'Unauthorized' });
  }

  if (!env.MAILCHANNELS_API_KEY || !env.MAILCHANNELS_FROM_EMAIL || !env.RFQ_NOTIFICATION_TO) {
    console.error('Missing required environment variables for MailChannels notification');
    return jsonResponse(500, { ok: false, error: 'Notification service not configured' });
  }

  let payload: UnknownRecord;
  try {
    payload = (await request.json()) as UnknownRecord;
  } catch {
    return jsonResponse(400, { ok: false, error: 'Invalid JSON payload' });
  }

  const fields = collectSubmissionFields(payload);

  const company = pickField(fields, ['company', 'company name', 'organization']);
  const contact = pickField(fields, ['contact', 'contact name', 'full name', 'name']);
  const email = pickField(fields, ['email', 'email address']);
  const whatsapp = pickField(fields, ['whatsapp', 'phone', 'mobile']);
  const aogValue = pickField(fields, ['aog', 'urgent', 'priority']);
  const neededBy = pickField(fields, ['needed by', 'need by', 'required by', 'eta']);
  const destination = pickField(fields, ['destination', 'airport', 'ship to', 'location']);
  const partsList = pickField(fields, ['parts list', 'part list', 'parts', 'part numbers', 'pn']);
  const certRequirement = pickField(fields, ['cert requirement', 'certificate', '8130', 'form 1', 'coc']);
  const notes = pickField(fields, ['notes', 'comment', 'remarks']);
  const subjectHint = pickField(fields, ['subject', 'title']);

  const isAOG = yesLike(aogValue) || /\baog\b/i.test(subjectHint) || /\baog\b/i.test(notes);

  const summaryCompany = company || contact || 'Unknown Sender';
  const summaryNeededBy = neededBy || 'No needed-by time';
  const subjectPrefix = isAOG ? '[AOG] ' : '';
  const subject = `[Angkasa Supply RFQ] ${subjectPrefix}${summaryCompany} ${summaryNeededBy}`.trim();

  const submissionId = normalize((payload.data as UnknownRecord | undefined)?.submissionId) ||
    normalize(payload.submissionId);

  const lines = [
    'New RFQ submission received.',
    '',
    `Company: ${company || 'N/A'}`,
    `Contact: ${contact || 'N/A'}`,
    `Email: ${email || 'N/A'}`,
    `WhatsApp: ${whatsapp || 'N/A'}`,
    `AOG: ${isAOG ? 'Yes' : aogValue || 'No/Not specified'}`,
    `Needed-by: ${neededBy || 'N/A'}`,
    `Destination: ${destination || 'N/A'}`,
    `Cert requirement: ${certRequirement || 'N/A'}`,
    '',
    'Parts list:',
    partsList || 'N/A',
    '',
    'Notes:',
    notes || 'N/A',
    '',
    `Submission ID: ${submissionId || 'N/A'}`,
  ];

  const textBody = lines.join('\n');

  const htmlCompany = toHtmlLineBreaks(company);
  const htmlContact = toHtmlLineBreaks(contact);
  const htmlEmail = toHtmlLineBreaks(email);
  const htmlWhatsapp = toHtmlLineBreaks(whatsapp);
  const htmlAog = toHtmlLineBreaks(isAOG ? 'Yes' : aogValue || 'No/Not specified');
  const htmlNeededBy = toHtmlLineBreaks(neededBy);
  const htmlDestination = toHtmlLineBreaks(destination);
  const htmlCertRequirement = toHtmlLineBreaks(certRequirement);
  const htmlPartsList = toHtmlLineBreaks(partsList);
  const htmlNotes = toHtmlLineBreaks(notes);
  const htmlSubmissionId = toHtmlLineBreaks(submissionId);

  const htmlBody = `
    <h2>New RFQ submission received</h2>
    <p><strong>Company:</strong> ${htmlCompany}</p>
    <p><strong>Contact:</strong> ${htmlContact}</p>
    <p><strong>Email:</strong> ${htmlEmail}</p>
    <p><strong>WhatsApp:</strong> ${htmlWhatsapp}</p>
    <p><strong>AOG:</strong> ${htmlAog}</p>
    <p><strong>Needed-by:</strong> ${htmlNeededBy}</p>
    <p><strong>Destination:</strong> ${htmlDestination}</p>
    <p><strong>Cert requirement:</strong> ${htmlCertRequirement}</p>
    <p><strong>Parts list:</strong><br/>${htmlPartsList}</p>
    <p><strong>Notes:</strong><br/>${htmlNotes}</p>
    <p><strong>Submission ID:</strong> ${htmlSubmissionId}</p>
  `.trim();

  const mailPayload = {
    personalizations: [{ to: [{ email: env.RFQ_NOTIFICATION_TO }] }],
    from: { email: env.MAILCHANNELS_FROM_EMAIL, name: 'Angkasa Supply Notifications' },
    subject,
    content: [
      { type: 'text/plain', value: textBody },
      { type: 'text/html', value: htmlBody },
    ],
  };

  try {
    const response = await fetch('https://api.mailchannels.net/tx/v1/send', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': env.MAILCHANNELS_API_KEY,
      },
      body: JSON.stringify(mailPayload),
    });

    if (!response.ok) {
      const responseText = await response.text();
      console.error('MailChannels API error', {
        status: response.status,
        body: responseText.slice(0, 500),
      });
      return jsonResponse(500, { ok: false, error: 'Failed to send notification' });
    }

    return jsonResponse(200, { ok: true });
  } catch (error) {
    console.error('MailChannels request failed', error);
    return jsonResponse(500, { ok: false, error: 'Failed to send notification' });
  }
};
