const express = require("express");
const db = require("./utils/DataBaseUtils");
const bodyParser = require("body-parser");
const path = require("path");
const passport = require("passport");

const app = express();

var sessions = [];

app.use( bodyParser.json() );
app.use( express.static(path.resolve(__dirname,"../public")) );


app.get(/\short.*$/,async function(req,res){
  const cookie = request.getHeader("Cookie");
  const key = cookie.split("=")[1];

  var userSession = sessions.find(session => session.key = key);

  if (!userSession){
    res.status(401).send();
    return;
  };

  var linkMap = await db.getLink(userSession.id);

  res.redirect(linkMap.shortLink);
})

app.post("/register",async function(req,res){
  const user = req.body.user;
  try {
    await db.createUser(user);
  } catch (e) {
    res.status(500).send();
    return;
  };

  res.redirect("/login");

});

app.post("/login",async function(req,res){
  const {name,password} = req.body.user;
  if (!name || !password){
    res.status(400).send();
    return;
  };

  try {
    var user = db.getUserByName(name)
  } catch (e) {
    res.status(500).send();
    return ;
  }

  if (password !== user.password){
    res.status().send("wrong password");
    return;
  };


  if (sessions.find(session => session.name = name) === undefined){
    var sessionKey = generateSessionKey();
    session.push({
      id : user.id,
      key : sessionKey
    });

    res.setHeader("Set-Cookie",[`key=${sessionKey}`]);
    res.status(200).send();
  }

});

app.post("/logout",async function(req,res){
  const cookie = request.getHeader("Cookie");
  const key = cookie.split("=")[1];

  var userSessionIndex = sessions.findIndex(session => session.key = key);

  if (!userSessionIndex === -1){
    res.status(200).send();
    return;
  };

  sessions.splice(userSessionIndex,1);
  res.setHeader("Set-Cookie",[`key=''`]);
  res.status(200).send();
});

app.post("/createLink",async function(req,res){
  const {longLink} = req.body;
  const shortLink = generateShortLink();
  const linkMap = {
    longLink,
    shortLink,
    value : 0
  };
  try {
    await db.createLink(linkMap);
  } catch (e) {
    res.status(500).send();
    return
  }
  res.send(linkMap);
})

app.listen(3000);


function generateShortLink(){
  return "localhost:3000/short" + Math.random().toString(36).substring(2, 15);
};

function generateSessionKey(){
  return Math.random().toString(36).substring(2, 15);
}
