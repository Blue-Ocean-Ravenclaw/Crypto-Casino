import { db } from '../../../server/model.js';

export default async function handler(req, res) {

  if (req.method === 'PUT') {
    const query = { text: '', values: [] };

    query.text = `
      UPDATE nfts
      SET id_user = (SELECT id FROM users WHERE username = $1)
      WHERE id = (SELECT id FROM nfts WHERE id_user = 999 LIMIT 1)
      RETURNING *;
    `;
    query.values = [req.query.username];

    let result = await db.query(query);

    res.status(200).send({
      message: `NFT update successful for user: ${req.query.username}.`,
      nft: result.rows[0].image
    });

  } else {
    res.status(500).send({ message: 'This endpoint only accepts POST/PUT requests.' });
  }
}
