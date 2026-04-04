import DOMPurify from 'dompurify';

/** Strip all HTML tags from user input before storing in the database. */
export function sanitize(text: string): string {
  return DOMPurify.sanitize(text, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
}
