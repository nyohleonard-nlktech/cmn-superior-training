import { readDb, writeDb, parseBody, setCors } from './_lib/db.js';

export default async function handler(req: any, res: any) {
  setCors(res);
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const db = readDb();

  if (req.method === 'GET') {
    return res.status(200).json(db.announcement);
  }

  if (req.method === 'PUT') {
    const body = parseBody(req);
    db.announcement = {
      ...db.announcement,
      ...body,
      updated_at: new Date().toISOString()
    };
    writeDb(db);
    return res.status(200).json(db.announcement);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
