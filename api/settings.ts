import { readDb, writeDb, parseBody, setCors } from './_lib/db.js';

export default async function handler(req: any, res: any) {
  setCors(res);
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const db = readDb();

  if (req.method === 'GET') {
    return res.status(200).json(db.settings);
  }

  if (req.method === 'PUT') {
    const body = parseBody(req);
    db.settings = {
      ...db.settings,
      ...body,
      updated_at: new Date().toISOString()
    };
    writeDb(db);
    return res.status(200).json(db.settings);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
