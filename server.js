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
  fs.readJson("./data/blogPosts.json").then(blogPosts =>
    res.render("index", {
      firstName: "Lorenzo",
      lastName: "Turrino",
      blogPosts: blogPosts
    })
  );
});

app.get("/my-cv", (req, res) => {
  res.render("my-cv", {
    firstName: "Lorenzo",
    lastName: "Turrino"
  });
});

app.get("/composepost", (req, res) => {
  res.render("compose-post");
});

// "RESTful" resources

app.post("/post", (req, res) => {
  const newPost = req.body;

  fs.readJson("./data/blogPosts.json")
    .then(blogPosts => blogPosts.concat(newPost))
    .then(updatedBlogPosts =>
      fs.writeJson("./data/blogPosts.json", updatedBlogPosts)
    )
    .then(() => res.redirect("/"));
});

app.get("/post/:postId", (req, res) => {
  const postId = req.params.postId;

  fs.readJson("./data/blogPosts.json").then(blogPosts =>
    res.render("post-view", {
      blogPost: blogPosts[postId]
    })
  );
});

app.put("/post/:postId", (req, res) => {
  // use a PUT (or PATCH) to modify a blog, without changing its id
});

app.delete("/post/:postId", (req, res) => {
  const postId = req.params.postId;

  fs.readJson("./data/blogPosts.json")
    .then(blogPosts => {
      blogPosts.splice(postId, 1);
      return blogPosts;
    })
    .then(updatedBlogPosts =>
      fs.writeJson("./data/blogPosts.json", updatedBlogPosts)
    )
    .then(() => res.redirect("/"));
});

/* if I wanted to have another resource on the server, for example users, I could define a set of REST endpoint like so */

app.get("/users/", (req, res) => { /* returns list of all users */ });

app.post("/users/", (req, res) => { /* create a new user. Note how there is no userID as it gets assigned on creation */ });

app.get("/users/:userID", (req, res) => { /* return details for userID */ });

app.put("/users/:userID", (req, res) => { /* update details for userID */ });

app.delete("/users/:userID", (req, res) => { /* delete userID */ });



const SERVER_PORT = process.env.PORT || 3000;
app.listen(SERVER_PORT, function() {
  console.log(
    `Server is listening on port ${SERVER_PORT}. Ready to accept requests!`
  );
});
