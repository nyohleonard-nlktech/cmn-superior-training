import { setCors } from './_lib/db.js';

export default async function handler(req: any, res: any) {
  setCors(res);
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  return res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
}
