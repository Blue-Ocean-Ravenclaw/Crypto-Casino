import { db } from "../../../server/model.js";
import { generateDiceGame } from "../../../lib/dice.js";
import { generateBingoGame } from "../../../lib/bingo.js";
import { getLadyLuck } from "../../../lib/ladyLuck.js";

export default async function handler(req, res) {
  if (req.method === "GET") {
    let username = req.query.username;
    let card_name = req.query.card_name;

    const query = { text: "", values: [] };

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
        cards: -1,
      };
      if (queryData.quantity > 0) {
        responseBody.cards = queryData.quantity - 1;
        switch (card_name) {
          case "highroller":
            responseBody.game = await generateDiceGame();
            break;
          case "bingo":
            responseBody.game = await generateBingoGame();
            break;
          case "luckylucy":
            responseBody.game = await getLadyLuck();
            break;
        }
        useCard(queryData.id_user, card_name);
        responseBody.game.nft = await prizeTransaction(
          username,
          card_name,
          responseBody.game
        );
      }
      res.status(200).send(responseBody);
    } else {
      res.status(204).send();
    }
  } else {
    res
      .status(500)
      .send({ message: "This endpoint only accepts GET requests." });
  }
}

function useCard(id_user, card_name) {
  const query = { text: "", values: [] };

  query.text = `
    UPDATE card_inventory
    SET quantity = quantity - 1
    WHERE id_user = $1
    AND card_name = $2
  `;
  query.values = [id_user, card_name];

  db.query(query);
}

async function prizeTransaction(username, card_name, game) {
  if (game.prize !== "loser") {
    if (game.prize === "grandPrize") {
      //execute NFT transaction;
      const query = { text: "", values: [] };

      query.text = `
        UPDATE nfts
        SET id_user = (SELECT id FROM users WHERE username = $1)
        WHERE id = (SELECT id FROM nfts WHERE id_user = 999 LIMIT 1)
        RETURNING *;
      `;
      query.values = [username];

      let result = await db.query(query);
      return result.rows[0]?.image;
    } else {
      let tokens;
      switch (card_name) {
        case "highroller":
          tokens = 10; //base cost
          switch (game.prize) {
            case "secondPrize":
              tokens *= 10;
              break;
            case "thirdPrize":
              tokens *= 5;
              break;
            case "fourthPrize":
              tokens *= 1;
              break;
          }
          break;
        case "bingo":
          tokens = 20; //base cost
          switch (game.prize) {
            case "secondPrize":
              tokens *= 10;
              break;
            case "thirdPrize":
              tokens *= 5;
              break;
            case "fourthPrize":
              tokens *= 2;
              break;
          }
          break;
        case "luckylucy":
          tokens = 15; //base cost
          switch (game.prize) {
            case "doubleSeconds":
              tokens *= 20;
              break;
            case "doubleThirds":
              tokens *= 10;
              break;
            case "second":
              tokens *= 5;
              break;
            case "third":
              tokens *= 1;
              break;
          }
          break;
      }
      const query = { text: "", values: [] };
      query.text = `
        UPDATE users
        SET tokens = tokens + $1
        WHERE username = $2
      `;
      query.values = [tokens, username];

      await db.query(query);
    }
  }
  return null;
}
