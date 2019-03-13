const express = require("express");
const exphbars = require("express-handlebars");
const bodyParser = require('body-parser');
const fs = require("fs-extra");

const app = express(); // initialise the express

app.engine('handlebars',exphbars()); // initialise the handlebars engine { defaultLayout: "main" }
app.set('view engine', 'handlebars'); // specify engine for page rendering

//middleware to send static files
app.use(express.static(__dirname +"/public/"));

//middleware to read request body of formdata
app.use(bodyParser.urlencoded({ extended : true}));

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
