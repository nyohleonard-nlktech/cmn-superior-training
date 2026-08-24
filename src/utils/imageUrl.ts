import { resolveImage } from '../assets/images';

// Helper to normalize image URLs for consistent static asset serving across environments
export function getOptimizedImageUrl(url?: string | null): string {
  return resolveImage(url);
}
