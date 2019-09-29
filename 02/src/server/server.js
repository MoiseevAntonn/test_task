const express = require("express");
const db = require("./utils/DataBaseUtils");
const bodyParser = require("body-parser");
const path = require("path");
const passport = require("passport");
const fallback = require("express-history-api-fallback");
const fs = require("fs");
const {port} = require("../etc/config.json");

const app = express();

var sessions = [];

app.use( bodyParser.json() );
app.use( express.static(path.resolve(__dirname,"../public")) );




app.get("/profile/get",async function(req,res){
  const cookie = req.header("cookie")

  if (!cookie){
    res.status(400).send();
    return;
  }
  const key = cookie.split("=")[1];

  if (cookie && key){
    var userSession = sessions.find(session => session.key === key);
    if (userSession){
      try {
        var user = await  db.getUserById(userSession.id);
        var links = await db.getLinks(user.id)
      } catch (e) {
        res.status(500).send();
        return ;
      }
      res.status(200).send({
        user,
        links
      });
      return
    }
  }

  res.status(400).end();

})

app.get("/profile/logout",async function(req,res){
  const cookie = req.header("cookie")
  const key = cookie.split("=")[1];

  var userSessionIndex = sessions.findIndex(session => session.key = key);

  if (!userSessionIndex === -1){
    res.status(200).send();
    return;
  };

  sessions.splice(userSessionIndex,1);

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


  if (sessions.find(session => session.id = user.id) === undefined){
    var sessionKey = generateSessionKey();
    sessions.push({
      id : user.id,
      key : sessionKey
    });

    res.setHeader("Set-Cookie",[`key=${sessionKey}`]);
  };

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
  const cookie = req.header("cookie")
  const key = cookie.split("=")[1];

  var userSession = sessions.find(session => session.key = key);

  if (!userSession){
    res.status(401).send();
    return;
  };

  try {
    var links = await db.getLinks(userSession.id);
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

//app.use( fallback( "index.html", {root : path.resolve(__dirname,"../public")} ));

app.listen(port,()=>{
  console.log(`server is runnig on port ${port}`);
});


function generateShortLink(){
  return "localhost:3000/" + Math.random().toString(36).substring(2, 10);
};

function generateSessionKey(){
  return Math.random().toString(36).substring(2, 15);
}
