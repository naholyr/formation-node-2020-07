const express = require("express")
const bodyParser = require('body-parser')

const { check_user } = require("./lib/db.js")

const app = express()

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post("/login", async (req, res) => {
  console.log(req.body)
  try {
    let correct = await check_user(req.body.username, req.body.password)
    if (correct) {
      return res.send("Logged !")
    } else {
      return res.status(401).send("Nop")
    }
  } catch (e) {
    console.log(e);
    return res.status(401).send("Nop")
  }

})

app.get('/')

app.listen(2811, () => {
  console.log("Go to http://localhost:2811")
})