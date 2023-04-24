//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require("lodash");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/postsDB");

const homeStartingContent = "This Web Application serves the purpose of a blog/daily journal. This is the Home section, where all the existing posts should be displayed. On this page, all posts' previews are limited to 100 characters. Clicking on 'Read More' will render the page containing the post that was clicked. To add a new post, you can click the '+' button which will render the 'compose' page.";
const aboutContent = "My name is Andra Victoria Bata and I'm a MSci Computer Science graduate with a strong passion for Web Development and Artifical Intelligence. My first encounter with Web Development happened in high-school, when I had to create a Front-End project for one of my Informatics classes. I was so excited about the creative freedom learning HTML and CSS has offered me that I could not decide on a single design so I created multiple versions of the same page. During my university degree, I got to have hands-on experience with multiple areas of Computer Science, including Software Development and Artificial Intelligence, the latter being the subject of both my Bachelor's and Master's dissertations. Building this portfolio has helped me solidify my knowledge in Web Development and extend my horizons regarding Responsive Design and standard coding principles. If you're interested to see more of my projects you can do so by visiting my Github page.";
const contactContent = "If you wish to get in touch with me, drop me a message using the form below.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const postsSchema=new mongoose.Schema({
  title:String,
  text:String
});

const Post = mongoose.model("Post", postsSchema);


app.get("/", function(req,res){
  Post.find({}).then((data)=>{
    res.render("home", {par:homeStartingContent,posts:data});
  })
})

app.post("/", function(req,res){
  res.redirect("compose");
})

app.get("/about", function(req,res){
  res.render("about", {par:aboutContent});
})

app.get("/contact", function(req,res){
  res.render("contact", {par:contactContent});
})

app.get("/compose", function(req,res){
  res.render("compose", {par:contactContent});
})

app.post("/compose", function(req,res){

  const newPost= new Post({
    title:req.body.titleInput,
    text:req.body.textInput
  });

  newPost.save();
  
  res.redirect("/");

})

app.get("/posts/:topic", function(req,res){

  const requestedTitle=req.params.topic;

  Post.findOne({_id:requestedTitle}).then((data)=>{
    res.render("post",{title:data.title,text:data.text});
  });
  
})



app.listen(3000, function() {
  console.log("App is listening on port 3000");
});
