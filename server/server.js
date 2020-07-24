"use strict";

// GET /fibo/{n} => JSON { input: n, output: fibo(n) }

const express = require("express");
const fibo = require("./lib/fibo.js");
const bodyParser = require("body-parser");
const {
  check_user,
  get_grid,
  get_current_player,
  get_players,
} = require("./lib/db.js");
const jwt = require("jsonwebtoken");
const config = require("config");
const initWebSocket = require("./lib/websocket-server");

const secret = config.token.secret;
const tokenExpiration = config.token.expiresIn;

const app = express();

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/fibo/:n(\\d+)", (req, res) => {
  let n = Number(req.params.n);
  if (isNaN(n)) {
    return res.status(400).send("Not a number");
  }

  let result = fibo.slowFibo(n);
  res.send({ n, result });
});

app.post("/login", async (req, res) => {
  try {
    // username of verified user
    let loggedUsername;

    const { username, password, token } = req.body;
    if (username && password) {
      // Login by username/password
      if (await check_user(req.body.username, req.body.password)) {
        loggedUsername = req.body.username;
      } else {
        return res
          .status(403)
          .send({ message: "Invalid login/password", code: "AUTH_FAIL" });
      }
    } else if (token) {
      // Login by token
      try {
        const decoded = jwt.verify(token, secret);
        console.log(decoded);
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

    console.log({ loggedUsername });

    if (loggedUsername) {
      // User found (by login/password or token, whatever)
      const [grid, players, currentPlayer] = await Promise.all([
        get_grid(),
        get_players(),
        get_current_player(),
      ]);
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
});

const server = app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log("Go to http://localhost:3000/fibo/12");
});

initWebSocket(server);
