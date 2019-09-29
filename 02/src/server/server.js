const express = require("express");
const db = require("./utils/DataBaseUtils");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const {port} = require("../etc/config.json");
const session = require("express-session");

const app = express();

var sessions = [];

app.use( bodyParser.json() );
app.use( express.static(path.resolve(__dirname,"../public")) );
app.use( session({
  secret : generateSessionKey(),
  saveUninitialized : false,
  resave : true
}) )




app.get("/profile/get",async function(req,res){

  if (!req.session.userId) {
    res.status(400).end();
    return ;
  }

  try {
     var user = await db.getUserById(req.session.userId);
     var links = await db.getLinks(req.session.userId)
  } catch (e) {
     res.status(500).send();
     return ;
  }

  res.status(200).send({
    user,
    links
  });

})

app.get("/profile/logout",async function(req,res){
  req.session.destroy();

  res.status(200).send();
});


app.post("/register",async function(req,res){
  const user = req.body;
  try {
    await db.createUser(user);
  } catch (e) {
    res.status(500).send();
    return;
  };

  res.redirect("/");

});

app.post("/login",async function(req,res){
  const {name,password} = req.body;
  if (!name || !password){
    res.status(400).send();
    return;
  };

  try {
    var user = await db.getUserByName(name)
  } catch (e) {
    res.status(500).send();
    return ;
  }

  if (!user){
    res.status(400).send("not such user");
    return;
  };

  if (password !== user.password){
    res.status(400).send("wrong password");
    return;
  };

  req.session.userId = user.id;

  res.status(200).end();

});



app.post("/profile/createLink",async function(req,res){
  const {longLink,id} = req.body;
  const shortLink = generateShortLink();
  const linkMap = {
    longLink,
    shortLink,
    id,
    count : 0
  };
  try {
    await db.createLink(linkMap);
  } catch (e) {
    res.status(500).send();
    return
  }
  res.send(linkMap);
});

app.get("/login",async function(req,res){
  res.sendFile(path.resolve(__dirname,"../public/index.html"));
});
app.get("/register",async function(req,res){
  res.sendFile(path.resolve(__dirname,"../public/index.html"));
});
app.get("/profile",async function(req,res){
  res.sendFile(path.resolve(__dirname,"../public/index.html"));
});

app.get(/.+/,async function(req,res){

  if (!req.session.userId) {
    res.status(401).send();
    return;
  }

  try {
    var links = await db.getLinks(req.session.userId);
  } catch (e) {
    res.status(500).send();
    return;
  }

  //var linkMap = links.find(link => (new RegExp(req.url)).test(link.shortlink))
  var linkMap = links.find(link => link.shortlink === req.headers.host + req.url);
  if (!linkMap){
    res.status(500).send();
    return;
  };

  try {
    await db.incrementLink(linkMap.id,linkMap.shortlink)
  } catch (e) {
    res.status(500).end();
    return;
  }

  res.redirect(linkMap.longlink);
})


app.listen(port,()=>{
  console.log(`server is runnig on port ${port}`);
});


function generateShortLink(){
  return "localhost:3000/" + Math.random().toString(36).substring(2, 10);
};

function generateSessionKey(){
  return Math.random().toString(36).substring(2, 15);
}
