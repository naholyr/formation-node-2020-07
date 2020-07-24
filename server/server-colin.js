const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const ws = require("./lib/websocket-server");

const { check_user } = require("./lib/db.js");

const secret_key = "weshalors";

const app = express();

app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.post("/login", async (req, res) => {
  let confirmed = false;
  let token;
  let user_data;
  try {
    let ok = false;
    if (req.body.username) {
      ok = await check_user(req.body.username, req.body.password);
    }
    if (ok) {
      token = jwt.sign({ username: req.body.username }, secret_key);
      confirmed = true;
    } else {
      if (req.body.token) {
        try {
          user_data = jwt.verify(req.body.token, secret_key);
          confirmed = true;
        } catch (e) {
          confirmed = false;
        }
      }
    }
    if (confirmed) {
      let username;
      if (req.body.username) {
        username = req.body.username;
      } else {
        username = user_data.username;
      }
      let grid = Array(25).fill(""); // TODO from DB
      let players = [{ username: "John Doe", score: 7 }]; // TODO from DB
      let currentPlayer = "John Doe";
      token = jwt.sign({ username: req.body.username }, secret_key);
      res.send({
        username: username,
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
    console.log(err);
    res.status(500).send({ message: err.message, code: "UNEXPECTED" });
  }
});

app.get("/");

const server = app.listen(2811, () => {
  console.log("Go to http://localhost:2811");
});

ws(server);
