import { db } from '../../../server/model';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const query = { text: '', values: [] };

    query.text = `
      SELECT
        users.username, users.email, users.tokens, users.wallet_address,

        (SELECT
          ARRAY_AGG(
            JSON_BUILD_OBJECT(
              'image', nfts.image,
              'value', nfts.value,
              'name', nfts.name,
              'description', nfts.description
            )
          )
        FROM nfts
        WHERE users.id = nfts.id_user
        ) nfts,

        (SELECT
          ARRAY_AGG(
            JSON_BUILD_OBJECT(
              'card_name', card_inventory.card_name,
              'quantity', card_inventory.quantity
            )
          ) card_inventory
        FROM card_inventory
        WHERE users.id = card_inventory.id_user
        ) card_inventory

      FROM users
      WHERE email = $1;
    `;
    query.values = [req.query.email];

    const { rows } = await db.query(query);
    res.status(200).send(rows[0]);
  } else {
    res.status(500).send({ message: 'This endpoint only accepts GET requests.' });
  }
}
