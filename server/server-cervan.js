const express = require("express");
// const fibo = require("./lib/fibo.js");
const bodyParser = require("body-parser");
const { check_user: checkUser } = require('./lib/db.js');

const app = express();

// GET /fibo/{n} => JSON { input: n, output: fibo(n) }

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// app.get("/fibo/:n", (req, res) => {

//     let n = parseInt(req.params.n);

//     if (isNaN(n)) {

//         res.status(400).send("n pas int");
//     } else {
//         res.send(String(fibo.slowFibo(n)));
//     }

// });

app.post("/login", (req, res) => {

  if (checkUser(req.body.username, req.body.password)) {
    res.status(200);
  } else {
    res.status(500);
  }

});

app.listen(3002, () => console.log("Server sur http://localhost:3002/fibo/12"));