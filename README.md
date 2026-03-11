# Angkasa Supply Website

SEO-first Astro + Tailwind website for Angkasa Supply, targeted for Cloudflare Pages with Tally-powered RFQ intake, Cloudflare Pages Functions webhook notifications, and a Sanity-ready content layer with local seed fallback.

## Stack

- Astro (static-first)
- Tailwind CSS
- Sanity-ready content fetch layer with local fallback seed content
- Cloudflare Pages
- Tally form embed (RFQ)
- Cloudflare Pages Function (`/api/tally-webhook`)
- MailChannels Email API (`https://api.mailchannels.net/tx/v1/send`)

## Project Structure

```text
.
|-- functions/
|   `-- api/
|       `-- tally-webhook.ts
|-- public/
|-- src/
|   |-- components/
|   |-- config/
|   |   `-- site.ts
|   |-- lib/
|   |   |-- content.ts
|   |   |-- queries.ts
|   |   |-- rfq.ts
|   |   |-- sanity.ts
|   |   `-- seed-content.ts
|   |-- layouts/
|   |   `-- BaseLayout.astro
|   |-- pages/
|   |   |-- index.astro
|   |   |-- engine-sourcing.astro
|   |   |-- aog-support.astro
|   |   |-- rotable-parts.astro
|   |   |-- aviation-consumables.astro
|   |   |-- surplus-inventory.astro
|   |   |-- inventory/
|   |   |-- blog/
|   |   |-- process.astro
|   |   |-- compliance.astro
|   |   |-- rfq.astro
|   |   |-- contact.astro
|   |   `-- privacy.astro
|   `-- styles/
|       `-- global.css
|-- .env.example
|-- astro.config.mjs
|-- tailwind.config.mjs
`-- README.md
```

## 1) Local Development

1. Install dependencies:

```bash
npm install
```

2. Copy env template:

```bash
cp .env.example .env
```

3. Set `PUBLIC_TALLY_FORM_ID` in `.env` (or in `src/config/site.ts` fallback). `PUBLIC_SITE_URL` defaults to `https://angkasasupply.com` and can be overridden per environment.
4. To use Sanity as the live content source, also set `PUBLIC_SANITY_PROJECT_ID` and `PUBLIC_SANITY_DATASET`. If these are absent, the site will build from the seeded content in `src/lib/seed-content.ts`.

5. Start dev server:

```bash
npm run dev
```

6. Build production output:

```bash
npm run build
```

## 2) Tally RFQ Embed Setup

The RFQ page (`/rfq`) uses full-page embed by default.

Configuration source:

- Preferred: `PUBLIC_TALLY_FORM_ID` environment variable.
- Fallback: edit `src/config/site.ts` and replace `REPLACE_WITH_TALLY_FORM_ID`.

The page includes a small `postMessage` listener to auto-adjust iframe height when Tally emits resize events.

## 3) Cloudflare Pages Deployment

Create a new Cloudflare Pages project connected to this repository.

Use these settings:

- Framework preset: `Astro`
- Build command: `npm run build`
- Output directory: `dist`

Deploy. Cloudflare Pages will publish static assets from `dist/` and automatically route requests under `/api/*` to functions in the `functions/` directory.

## 4) Environment Variables (Cloudflare Pages)

In Cloudflare Pages project settings, add the following variables for both Preview/Production as needed:

- `PUBLIC_TALLY_FORM_ID`
- `PUBLIC_SITE_URL`
- `PUBLIC_OG_IMAGE` (optional: absolute URL or root-relative path)
- `PUBLIC_SANITY_PROJECT_ID` (optional unless using live Sanity content)
- `PUBLIC_SANITY_DATASET` (optional unless using live Sanity content)
- `PUBLIC_SANITY_API_VERSION` (optional)
- `PUBLIC_SANITY_USE_CDN` (optional)
- `TALLY_WEBHOOK_SECRET`
- `MAILCHANNELS_API_KEY`
- `MAILCHANNELS_FROM_EMAIL`
- `RFQ_NOTIFICATION_TO`

Notes:

- `PUBLIC_` variables are exposed to the client build.
- Never hardcode secrets in repository files.

## 5) Tally Webhook Endpoint Setup

Endpoint implemented:

- `POST /api/tally-webhook`

Security behavior:

- Expects header `X-Tally-Secret`
- Compares against `TALLY_WEBHOOK_SECRET`
- Returns `401` on mismatch

In Tally:

1. Open your form settings.
2. Enable webhook/integration for form submissions.
3. Set webhook URL to:

```text
https://<your-domain>/api/tally-webhook
```

4. Add header:

```text
X-Tally-Secret: <your TALLY_WEBHOOK_SECRET value>
```

5. Send a test submission.

## 6) MailChannels Email API Setup

The webhook function sends notification emails by POSTing JSON to:

- `https://api.mailchannels.net/tx/v1/send`

Headers used:

- `X-Api-Key: <MAILCHANNELS_API_KEY>`
- `Content-Type: application/json`

Before sending in production:

1. Create MailChannels account/API key.
2. Configure domain lockdown records and authorized sender domain in MailChannels.
3. Set `MAILCHANNELS_FROM_EMAIL` to a verified sender (for example `notifications@your-domain.com`).

## 7) Webhook Email Behavior

On valid submission, function extracts RFQ fields such as:

- company
- contact
- email
- WhatsApp
- AOG
- needed-by
- destination
- parts list
- cert requirement
- notes

Then sends notification email to `RFQ_NOTIFICATION_TO` with subject format:

```text
[Angkasa Supply RFQ] <AOG?> <Company> <Needed-by>
```

Success response:

```json
{ "ok": true }
```

Failure response:

```json
{ "ok": false, "error": "Failed to send notification" }
```

## 8) Go-Live Checklist

1. Point production domain in Cloudflare Pages.
2. Set all required env vars in Cloudflare Pages.
3. Set `PUBLIC_SITE_URL` and verify `robots.txt` + `sitemap.xml` are published.
4. Set `PUBLIC_TALLY_FORM_ID` and confirm `/rfq` render.
5. Configure Tally webhook to `/api/tally-webhook` with `X-Tally-Secret`.
6. Confirm MailChannels domain lockdown + sender verification.
7. Submit a live test RFQ and verify email delivery.
8. Review footer contact placeholders (`src/config/site.ts`) and replace with real details.
