import { readDb, writeDb, parseBody, setCors } from '../../_lib/db.js';

export default async function handler(req: any, res: any) {
  setCors(res);
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'PATCH' && req.method !== 'POST' && req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let id = req.query?.id as string;
  if (!id && req.url) {
    const cleanUrl = req.url.split('?')[0];
    const segments = cleanUrl.split('/').filter(Boolean);
    // e.g. ['api', 'registrations', 'reg-123', 'completed']
    const regIdx = segments.indexOf('registrations');
    if (regIdx !== -1 && segments[regIdx + 1]) {
      id = segments[regIdx + 1];
    }
  }

  if (!id) {
    return res.status(400).json({ error: 'Registration ID is required' });
  }

  const db = readDb();
  const itemIndex = (db.registrations || []).findIndex((r: any) => r.id === id);
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Registration not found' });
  }

  const { completed, notes } = parseBody(req);
  db.registrations[itemIndex].completed = Boolean(completed);
  if (notes !== undefined) {
    db.registrations[itemIndex].notes = notes;
  }
  writeDb(db);
  return res.status(200).json(db.registrations[itemIndex]);
}
