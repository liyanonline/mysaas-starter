// utils/sanitize.ts
import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitize HTML content for safe rendering.
 * Works on both server (SSR) and client.
 * @param dirty - The raw HTML string.
 * @returns A safe HTML string.
 */
export function sanitizeHTML(dirty: string): string {
    return DOMPurify.sanitize(dirty);
}
