const fs = require("fs-extra");

const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");

const app = express();
const bodyParserMiddleware = bodyParser.urlencoded({ extended: true });

app.engine("handlebars", handlebars());
app.set("view engine", "handlebars");

app.use(express.static("public"));
app.use(bodyParserMiddleware);

app.get("/", (req, res) => {
  fs.readJson("./data/blogPosts.json")
    .then(blogPosts =>
      res.render("index", {
        firstName: "Lorenzo",
        lastName: "Turrino",
        blogPosts: blogPosts
      }));
});

app.get("/my-cv", (req, res) => {
  res.render("my-cv", {
    firstName: "Lorenzo",
    lastName: "Turrino"
  });
});

app.get("/post/:postId", (req, res) => {
  fs.readJson("./data/blogPosts.json")
    .then(blogPosts =>
      res.render("post-view", {
        blogPost: blogPosts[req.params.postId]
      }));
});

app.get("/composepost", (req, res) => {
  res.render("compose-post");
});

app.post("/post", (req, res) => {
  const newPost = req.body;

  fs.readJson("./data/blogPosts.json")
    .then(blogPosts => blogPosts.concat(newPost))
    .then(updatedBlogPosts => fs.writeJson("./data/blogPosts.json", updatedBlogPosts))
    .then(() => res.redirect("/"))
});

const SERVER_PORT = process.env.PORT || 3000;
app.listen(SERVER_PORT, function() {
  console.log(
    `Server is listening on port ${SERVER_PORT}. Ready to accept requests!`
  );
});
