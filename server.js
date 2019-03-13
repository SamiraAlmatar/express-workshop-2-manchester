const express = require("express");
const exphbars = require("express-handlebars");
const bodyParser = require('body-parser');
const fs = require("fs-extra");

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/my-cv", (req, res) => {
  res.sendFile(__dirname + "/views/my-cv.html");
});

const SERVER_PORT = process.env.PORT || 3000;
app.listen(SERVER_PORT, function() {
  console.log(
    `Server is listening on port ${SERVER_PORT}. Ready to accept requests!`
  );
});
