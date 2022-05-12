import { db } from '../../../server/model.js';
import { generateDiceGame } from '../../../lib/dice.js';
import { generateBingoGame } from '../../../lib/bingo.js';
import { getLadyLuck } from '../../../lib/ladyLuck.js';


export default async function handler(req, res) {
  if (req.method === 'GET') {
    let username = req.query.username;
    let card_name = req.query.card_name;

    const query = { text: '', values: [] };

    query.text = `
    SELECT COALESCE(quantity, 0) as quantity, id_user
    FROM card_inventory
    WHERE id_user = (SELECT id FROM users WHERE username =  $1)
    AND card_name = $2
    `;
    query.values = [username, card_name];

    const queryResponse = await db.query(query);
    const queryData = queryResponse.rows[0];

    if (queryData) {
      let responseBody = {
        game: {},
        cards: -1
      };
      if (queryData.quantity > 0) {

        responseBody.cards = queryData.quantity - 1;
        switch (card_name) {
          case 'highroller':
            responseBody.game = generateDiceGame();
            break;
          case 'bingo':
            responseBody.game = generateBingoGame();
            break;
          case 'ladyluck':
            responseBody.game = getLadyLuck();
            break;
        }
        useCard(queryData.id_user, card_name);
      }
      res.status(200).send(responseBody);
    } else {
      res.status(204).send();
    }

  } else {
    res.status(500).send({ message: 'This endpoint only accepts GET requests.' });
  }
}

function useCard (id_user, card_name) {
  const query = { text: '', values: [] };

  query.text = `
    UPDATE card_inventory
    SET quantity = quantity - 1
    WHERE id_user = $1
    AND card_name = $2
  `;
  query.values = [id_user, card_name];

  db.query(query);
}