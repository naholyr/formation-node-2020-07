const express = require("express");
// const fibo = require("./lib/fibo.js");
const bodyParser = require("body-parser");
const { check_user } = require("./lib/db.js");
const jwt = require("jsonwebtoken");
const initWebSocket = require("./lib/websocket-server");

const app = express();

const secret = "oerkgprotkg";
const tokenExpiration = "24h";

// GET /fibo/{n} => JSON { input: n, output: fibo(n) }

app.use(express.static("public"));
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

app.post("/login", async (req, res) => {
  // TODO if req.body.username && req.body.password
  // Pas fini..
  // if(req.body.username && req.body.password){
  //   try {
  //     const ok = await check_user(req.body.username, req.body.password);
  //     if (ok) {
  //       const grid = Array(25).fill(""); // TODO from DB
  //       const players = [{ username: "John Doe", score: 7 }]; // TODO from DB
  //       const currentPlayer = "John Doe";
  //       const token = jwt.sign({ username: req.body.username }, secret, {
  //         expiresIn: "24h",
  //       });
  //       res.send({
  //         username: req.body.username,
  //         token,
  //         grid,
  //         players,
  //         currentPlayer,
  //       });
  //     } else {
  //       res
  //         .status(403)
  //         .send({ message: "Authentication failed", code: "AUTH_FAIL" });
  //     }
  //   } catch (err) {
  //     res.status(500).send({ message: err.message, code: "UNEXPECTED" });
  //   }
  // }else if(req.body.token){
  //   try{
  //   jwt.verify(req.body.token, secret);
  //   const token = jwt.sign({ username: req.body.username }, secret, {
  //     expiresIn: "24h",
  //   });
  //   res.send({
  //     username: req.body.username,
  //     token,
  //     grid,
  //     players,
  //     currentPlayer,
  //   });
  // }catch(err){
  //   res
  //   .status(500)
  //   .send({message : err.message, code:"TOKEN_EXPIRED"})
  // }

  try {
    // username of verified user
    let loggedUsername;

    const { username, password, token } = req.body;
    if (username && password) {
      // Login by username/password
      loggedUsername = await check_user(req.body.username, req.body.password);
    } else if (token) {
      // Login by token
      try {
        const decoded = jwt.verify(token, secret);
        loggedUsername = decoded.username;
      } catch (err) {
        // Invalid token
        return res.status(403).send({ message: err.message, code: err.code });
      }
    } else {
      // Invalid query body
      return res
        .status(400)
        .send({ message: "Invalid input", code: "BAD_REQUEST" });
    }

    if (loggedUsername) {
      // User found (by login/password or token, whatever)
      const grid = Array(25).fill(""); // TODO from DB
      const players = [{ username: "John Doe", score: 7 }]; // TODO from DB
      const currentPlayer = "John Doe"; // TODO from DB
      // Generate a new fresh token
      const token = jwt.sign({ username: loggedUsername }, secret, {
        expiresIn: tokenExpiration,
      });
      res.send({
        username: loggedUsername,
        token,
        grid,
        players,
        currentPlayer,
      });
    } else {
      res
        .status(403)
        .send({ message: "Authentication failed", code: "AUTH_FAIL" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message, code: "UNEXPECTED" });
  }

  // TODO else if req.body.token => jwt.verify(token, secret)
  // TODO else fuck off
});

app.post("/token");

const server = app.listen(3002, () =>
  console.log("Server sur http://localhost:3002")
);

initWebSocket(server);
