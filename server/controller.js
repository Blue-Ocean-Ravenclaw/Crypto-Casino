const Router = require('express-promise-router');
const model = require('./model');

const router = new Router();

router.get('/users', async (req, res) => {
  try {
    const { rows } = await model.getUsers();
    res.status(200).send(rows);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
});