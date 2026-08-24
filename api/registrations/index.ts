import { readDb, writeDb, parseBody, setCors } from '../_lib/db';

export default async function handler(req: any, res: any) {
  setCors(res);
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const db = readDb();

  if (req.method === 'GET') {
    return res.status(200).json(db.registrations || []);
  }

  if (req.method === 'POST') {
    const body = parseBody(req);
    const newReg = {
      id: `reg-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      name: body.name || '',
      phone: body.phone || '',
      location: body.location || '',
      about: body.about || '',
      preferred_month: body.preferred_month || '',
      preferred_location: body.preferred_location || '',
      training_interest: body.training_interest || 'All 4 Modules',
      paid: Boolean(body.paid),
      completed: Boolean(body.completed),
      notes: body.notes || '',
      created_at: new Date().toISOString()
    };

    db.registrations = [newReg, ...(db.registrations || [])];
    writeDb(db);
    return res.status(201).json(newReg);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
