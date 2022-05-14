import { db } from '../../../server/model';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const query = { text: '', values: [] };

    query.text = `
      UPDATE users
      SET tokens = tokens + $1
      WHERE username = $2
    `;
    query.values = [req.body.tokens, req.query.username];

    await db.query(query);

    res.status(200).send({ message: `Token update successful for user: ${req.query.username}.` });
  } else {
    res.status(500).send({ message: 'This endpoint only accepts POST requests.' });
  }
}
