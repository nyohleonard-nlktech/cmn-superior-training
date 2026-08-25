import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const BUCKET_NAME = 'product-assets';
export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

let supabaseInstance: SupabaseClient | null = null;

export function isSupabaseConfigured(): boolean {
  return Boolean(
    SUPABASE_URL &&
    SUPABASE_ANON_KEY &&
    SUPABASE_URL !== 'YOUR_SUPABASE_URL' &&
    SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY'
  );
}

export function getSupabaseClient(): SupabaseClient {
  if (!isSupabaseConfigured()) {
    throw new Error(
      'Supabase is not configured. Please define VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment variables.'
    );
  }

  if (!supabaseInstance) {
    supabaseInstance = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: false,
      },
    });
  }

  return supabaseInstance;
}

/**
 * Validates and uploads a raw image binary directly to Supabase Storage bucket 'product-assets'.
 * Returns the immutable public CDN URL.
 */
export async function uploadProductImage(file: File): Promise<string> {
  if (!file) {
    throw new Error('No file provided for upload.');
  }

  // 1. Validate MIME type
  const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/svg+xml',
    'image/avif',
  ];

  if (!file.type.startsWith('image/') && !allowedMimeTypes.includes(file.type.toLowerCase())) {
    throw new Error(
      `Invalid file format (${file.type || 'unknown'}). Please upload an image file (JPEG, PNG, WebP, GIF, SVG).`
    );
  }

  // 2. Validate File Size (Max 5MB)
  if (file.size > MAX_FILE_SIZE_BYTES) {
    const sizeInMb = (file.size / (1024 * 1024)).toFixed(2);
    throw new Error(
      `File size (${sizeInMb}MB) exceeds the maximum allowed limit of 5MB. Please choose a smaller image.`
    );
  }

  // 3. Get Supabase client
  const supabase = getSupabaseClient();

  // 4. Generate unique collision-resistant filename
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substring(2, 10);
  const sanitizedOriginalName = file.name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9.-]/g, '');
  const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const fileName = `products/${timestamp}-${randomSuffix}-${sanitizedOriginalName || `image.${extension}`}`;

  // 5. Direct binary upload to Supabase Storage bucket
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(fileName, file, {
      cacheControl: '31536000',
      upsert: false,
      contentType: file.type || 'image/jpeg',
    });

  if (error) {
    console.error('Supabase storage upload error:', error);
    throw new Error(
      `Upload failed: ${error.message}. Ensure the '${BUCKET_NAME}' bucket exists with public read access in Supabase.`
    );
  }

  // 6. Retrieve public CDN URL
  const { data: publicUrlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(data.path);

  if (!publicUrlData || !publicUrlData.publicUrl) {
    throw new Error('Could not generate public URL for uploaded asset.');
  }

  return publicUrlData.publicUrl;
}
