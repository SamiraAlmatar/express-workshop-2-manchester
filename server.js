const express = require("express");
const handlebars = require("express-handlebars");

const blogPosts = require("./data/blogPosts.json")

const app = express();

app.engine("handlebars", handlebars());
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", {
    firstName: "Lorenzo",
    lastName: "Turrino",
    blogPosts: blogPosts
  });
});

app.get("/my-cv", (req, res) => {
  res.render("my-cv", {
    firstName: "Lorenzo",
    lastName: "Turrino"
  });
});

app.get("/post/:postId", (req, res) => {
  res.render("post-view", {
    blogPost: blogPosts[req.params.postId]
  });
})

const SERVER_PORT = process.env.PORT || 3000;
app.listen(SERVER_PORT, function() {
  console.log(
    `Server is listening on port ${SERVER_PORT}. Ready to accept requests!`
  );
});
