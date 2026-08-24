import { readDb, writeDb, parseBody, setCors } from '../_lib/db.js';

export default async function handler(req: any, res: any) {
  setCors(res);
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  let id = req.query?.id as string;
  if (!id && req.url) {
    const cleanUrl = req.url.split('?')[0];
    const segments = cleanUrl.split('/').filter(Boolean);
    // e.g. ['api', 'registrations', 'reg-123']
    if (segments.length >= 3) {
      id = segments[2];
    }
  }

  if (!id) {
    return res.status(400).json({ error: 'Registration ID is required' });
  }

  const db = readDb();
  const itemIndex = (db.registrations || []).findIndex((r: any) => r.id === id);

  if (req.method === 'GET') {
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Registration not found' });
    }
    return res.status(200).json(db.registrations[itemIndex]);
  }

  if (req.method === 'PUT') {
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Registration not found' });
    }
    const updates = parseBody(req);
    db.registrations[itemIndex] = {
      ...db.registrations[itemIndex],
      ...updates,
      id // keep unchanged
    };
    writeDb(db);
    return res.status(200).json(db.registrations[itemIndex]);
  }

  if (req.method === 'DELETE') {
    db.registrations = (db.registrations || []).filter((r: any) => r.id !== id);
    writeDb(db);
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
