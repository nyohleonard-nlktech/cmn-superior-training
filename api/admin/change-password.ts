import { readDb, writeDb, parseBody, setCors } from '../_lib/db';

export default async function handler(req: any, res: any) {
  setCors(res);
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { newPassword } = parseBody(req);
  if (!newPassword || newPassword.length < 4) {
    return res.status(400).json({ error: 'Password must be at least 4 characters' });
  }

  const db = readDb();
  db.admin.password = newPassword;
  writeDb(db);
  return res.status(200).json({ success: true });
}
