import { toHTML } from '@portabletext/to-html';
import type { PortableTextBlock } from './types';

export const renderPortableText = (value?: PortableTextBlock[]): string => {
  if (!value?.length) return '';
  return toHTML(value);
};
