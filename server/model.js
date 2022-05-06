require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  max: 1000,
});

module.exports = {
  getUsers() {
    const query = { text: '', values: [] };
    query.text = `
      SELECT *
      FROM users;
    `;

    return pool.query(query);
  }

}