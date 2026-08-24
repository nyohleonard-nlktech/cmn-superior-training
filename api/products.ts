import { readDb, writeDb, parseBody, setCors } from './_lib/db';

export default async function handler(req: any, res: any) {
  setCors(res);
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Check if ID was passed in query or path
  const id = req.query?.id as string;
  const db = readDb();

  if (id) {
    const index = db.products.findIndex((p: any) => p.id === id);
    if (req.method === 'GET') {
      if (index === -1) return res.status(404).json({ error: 'Product not found' });
      return res.status(200).json(db.products[index]);
    }
    if (req.method === 'PUT') {
      if (index === -1) return res.status(404).json({ error: 'Product not found' });
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
  }

  if (req.method === 'GET') {
    return res.status(200).json(db.products || []);
  }

  if (req.method === 'POST') {
    const body = parseBody(req);
    const newProduct = {
      id: `prod-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name_en: body.name_en || 'New Product',
      name_fr: body.name_fr || 'Nouveau Produit',
      price: Number(body.price) || 0,
      description_en: body.description_en || '',
      description_fr: body.description_fr || '',
      photo_url: body.photo_url || '/images/raw_materials_1787567125868.jpg',
      category: body.category || 'soap',
      in_stock: body.in_stock !== false,
      unit: body.unit || '1 unit'
    };

    db.products = [newProduct, ...(db.products || [])];
    writeDb(db);
    return res.status(201).json(newProduct);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
