import { db } from '../../../server/model.js';

export default async function handler(req, res) {

  if (req.method === 'PUT') {
    const query = { text: '', values: [] };

    query.text = `
    SELECT COALESCE(quantity, 0)
    FROM
    (SELECT quantity
    FROM card_inventory
    WHERE id_user = (SELECT id FROM users WHERE username =  $1)
    AND card_name = $2) quantity
    `;
    query.values = [req.query.username, req.query.card_name];

    const cards = await db.query(query);

    res.status(200).send({ message: `${req.query.username} has ${cards.rows[0].coalesce} cards` });
  } else {
    res.status(500).send({ message: 'This endpoint only accepts POST/PUT requests.' });
  }
}

