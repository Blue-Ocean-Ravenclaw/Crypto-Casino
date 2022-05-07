import { db } from '../../../server/model.js';

export default async function handler(req, res) {
  let queryStr = `
  SELECT * FROM users WHERE username=$1;
  `;
  let result = await db.query(queryStr, [req.query.username])
  res.status(200).json({ result: result })
}

