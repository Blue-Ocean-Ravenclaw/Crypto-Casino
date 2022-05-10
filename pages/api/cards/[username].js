import { db } from '../../../server/model.js';

export default async function handler(req, res) {

  if (req.method === 'PUT') {
    const query = { text: '', values: [] };

    query.text = `
      INSERT INTO card_inventory(id_user, card_name, quantity)
      VALUES((SELECT id FROM users WHERE username = $2), $3, $1)
      ON CONFLICT (id_user, card_name)
      DO UPDATE SET quantity = (SELECT quantity FROM card_inventory WHERE id_user = (SELECT id FROM users WHERE username = $2) AND card_name = $3) + $1;
    `;
    query.values = [req.body.quantity, req.query.username, req.body.card_name];

    await db.query(query);

    res.status(200).send({ message: `Token update successful for user: ${req.query.username}.` });
  } else {
    res.status(500).send({ message: 'This endpoint only accepts POST/PUT requests.' });
  }
}

