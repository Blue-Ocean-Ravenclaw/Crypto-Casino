import { db } from '../../../server/model.js';

export default async function handler(req, res) {

  if (req.method === 'GET') {
    const query = { text: '', values: [] };

    query.text = `
      SELECT image
      FROM nfts
      WHERE id_user = 999
      LIMIT 5;
    `;

    let { rows } = await db.query(query);

    res.status(200).send({
      message: `Successfuly got all NFTS from admin.`,
      data: rows
    });

  } else {
    res.status(500).send({ message: 'This endpoint only accepts GET requests.' });
  }
}
