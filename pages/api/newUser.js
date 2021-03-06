import { db } from '../../server/model.js';

export default async function handler(req, res) {

  if (req.method === 'POST') {
    const query = { text: '', values: [] };

    query.text = `
      INSERT INTO users(username, email)
      VALUES ($1, $2)
      RETURNING *;
    `;
    query.values = [req.body.username, req.body.email];

    let { rows } = await db.query(query);
    res.status(200).send({ message: `Username "${req.body.username}" successfully created in database.`, data: rows });
  } else {
    res.status(500).send({ message: 'This endpoint only accepts POST requests.' });
  }
}
