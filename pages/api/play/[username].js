import { db } from '../../../server/model.js';
import { generateDiceGame } from '../../../lib/dice.js';

export default async function handler(req, res) {

  if (req.method === 'GET') {
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

    const queryResponse = await db.query(query);
    const cards = queryResponse.rows[0].coalesce;

    function createResponse () {
      let responseBody = {
        canPlay: false,
        game: {}
      };
      if (cards > 0) {
        responseBody.canPlay = true;
        switch (req.query.card_name) {
          case 'highroller':
            responseBody.game = generateDiceGame();
            return responseBody;
        }
      }
      return responseBody;
    }

    res.status(200).send(createResponse());
  } else {
    res.status(500).send({ message: 'This endpoint only accepts GET requests.' });
  }
}

