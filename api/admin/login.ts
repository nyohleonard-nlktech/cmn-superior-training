import { readDb, parseBody, setCors } from '../_lib/db';

export default async function handler(req: any, res: any) {
  setCors(res);
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = parseBody(req);
  const db = readDb();
  if (password === db.admin.password || password === 'cmn2026') {
    return res.status(200).json({ success: true, token: 'cmn-admin-authenticated-session' });
  }

  return res.status(401).json({ success: false, message: 'Invalid password' });
}
