import { db } from '../../../server/model.js';

export default async function handler(req, res) {

  if (req.method === 'PUT') {
    const query = { text: '', values: [] };

    query.text = `
      UPDATE card_inventory
      SET quantity = quantity + $1
      WHERE id_user = (SELECT id FROM users WHERE username = $2)
      AND WHERE card_name = $3;
    `;
    query.values = [req.body.quantity, req.query.username, req.body.card_name];

    await db.query(query);

    res.status(200).send({ message: `Token update successful for user: ${req.query.username}.` });
    // To do: Create a POST endpoint that creates a row in card_inventory if the user doens't have the specified card already.
  } else {
    res.status(500).send({ message: 'This endpoint only accepts POST/PUT requests.' });
  }
}

