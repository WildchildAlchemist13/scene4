import { supabaseAdmin } from './supabase-admin';

export interface ProductDef {
  title: string;
  files: string[];
  priceUsd: number;
}

export const PRODUCTS: Record<string, ProductDef> = {
  '916-storyteller': {
    title: 'The 9:16 Storyteller',
    files: ['916-storyteller.pdf'],
    priceUsd: 19,
  },
  'grab-and-keep': {
    title: 'Grab & Keep',
    files: ['grab-and-keep.pdf'],
    priceUsd: 39,
  },
  'story-mastery': {
    title: 'Story & Screenplay Mastery',
    files: ['story-mastery.pdf'],
    priceUsd: 99,
  },
  'creator-bundle': {
    title: 'Creator Bundle (Books 1 + 2)',
    files: ['916-storyteller.pdf', 'grab-and-keep.pdf'],
    priceUsd: 49,
  },
  'master-collection': {
    title: 'Master Collection (All 3 Books)',
    files: ['916-storyteller.pdf', 'grab-and-keep.pdf', 'story-mastery.pdf'],
    priceUsd: 129,
  },
};

export function getProduct(productId: string): ProductDef | null {
  return PRODUCTS[productId] ?? null;
}

export async function getDownloadUrls(productId: string): Promise<string[]> {
  const product = PRODUCTS[productId];
  if (!product) return [];

  const urls: string[] = [];
  for (const file of product.files) {
    const { data, error } = await supabaseAdmin.storage
      .from('books')
      .createSignedUrl(file, 3600);
    if (error) {
      console.error(`[products] sign URL failed for ${file}:`, error.message);
      continue;
    }
    if (data?.signedUrl) urls.push(data.signedUrl);
  }
  return urls;
}
