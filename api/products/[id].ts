import { readDb, writeDb, parseBody, setCors } from '../_lib/db.js';

export default async function handler(req: any, res: any) {
  setCors(res);
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Extract ID from req.query (Vercel file-based routing) or URL
  let id = req.query?.id as string;
  if (!id && req.url) {
    const segments = req.url.split('?')[0].split('/');
    id = segments[segments.length - 1];
  }

  if (!id) {
    return res.status(400).json({ error: 'Product ID is required' });
  }

  const db = readDb();
  const index = db.products.findIndex((p: any) => p.id === id);

  if (req.method === 'GET') {
    if (index === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }
    return res.status(200).json(db.products[index]);
  }

  if (req.method === 'PUT') {
    if (index === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }
    const body = parseBody(req);
    db.products[index] = {
      ...db.products[index],
      ...body,
      price: Number(body.price ?? db.products[index].price)
    };
    writeDb(db);
    return res.status(200).json(db.products[index]);
  }

  if (req.method === 'DELETE') {
    db.products = (db.products || []).filter((p: any) => p.id !== id);
    writeDb(db);
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
