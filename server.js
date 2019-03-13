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

//open the home page route
app.get("/", (req, res) => {
  fs.readJson("./data/blogPosts.json")
    .then(posts=>{
      //res.setHeader('Last-Modified', (new Date()).toUTCString());
      res.render('index',{
        Myname : 'Samira',
        page : 'Home',
        name : '<h1>Samira</h1>',
        date : new Date().toLocaleString(),
        posts : posts
      });
    });
});
//open the cv page
app.get("/my-cv", (req, res) => {
  res.render('my-cv',{
    name : '<h2>Resume</h2>',
    page : 'CV'
  });
});

//open post with id=x in new page
app.get("/readpost/:id", (req, res) => {
  const id = req.params.id;
  fs.readJson("./data/blogPosts.json")
    .then(posts =>{
      res.render('post',
      {
        name : '<h2>Posts</h2>',
        page : 'Post '+(parseInt(id)+1),
        date : new Date().toLocaleString(),
        post : posts[id]
      });
    });
});

//open form page to add post
app.get("/composepost", (req, res) => {
  // res.sendFile(__dirname + "/views/my-cv.html");
  res.render('composepost',{
    name : '<h2>Add Post</h2>',
    page : 'Posting..',
    date : new Date().toLocaleString()
  });
});


const SERVER_PORT = process.env.PORT || 3000;
app.listen(SERVER_PORT, function() {
  console.log(
    `Server is listening on port ${SERVER_PORT}. Ready to accept requests!`
  );
});
