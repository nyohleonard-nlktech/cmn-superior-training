// Helper to normalize image URLs for consistent static asset serving across environments
export function getOptimizedImageUrl(url?: string | null): string {
  if (!url) {
    return '/images/raw_materials_1787567125868.jpg';
  }
  
  // If it's a base64 data url or external http url, keep as is
  if (url.startsWith('data:') || url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  // Normalize legacy /src/assets/images/ or src/assets/images/ paths to /images/
  let normalized = url.replace(/^\/?src\/assets\/images\//, '/images/');
  if (!normalized.startsWith('/')) {
    normalized = '/' + normalized;
  }
  return normalized;
}
