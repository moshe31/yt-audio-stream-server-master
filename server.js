const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const endpoints = require("./api");

const app = express();

//Cors
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Static assets
app.use(express.static("public"));

//Default route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

//Routes
endpoints(app);

//404 Not Found Middleware
app.use(function(req, res, next) {
  res
    .status(404)
    .type("text")
    .send("Not Found");
});

const PORT = process.env.PORT || 5000;

//listener
var listener = app.listen(PORT, () => {
  console.log(`App is now listening on ${listener.address().port}`);
});
