'use strict'

// GET /fibo/{n} => JSON { input: n, output: fibo(n) }

const express = require("express");
const fibo = require("./lib/fibo.js");
const bodyParser = require('body-parser');
const { check_user } = require('./lib/db.js');
require('./lib/db')

const app = express();

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.get("/fibo/:n(\d+)", (req, res) => {
  let n = Number(req.params.n);
  if (isNaN(n)) {
    return res.status(400).send("Not a number");
  }

  let result = fibo.slowFibo(n);
  res.send({ n, result });
})

app.post('/login', async (req, res) => {
  try {
    const ok = await check_user(req.body.username, req.body.password);
    if (ok) {
      res.send({ username: req.body.username, token: 'TODO' });
    } else {
      res.status(403).send({ message: 'Authentication failed', code: 'AUTH_FAIL' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message, code: 'UNEXPECTED' });
  }
});

app.listen(3000, () => {
  console.log("Go to http://localhost:3000/fibo/12");
});