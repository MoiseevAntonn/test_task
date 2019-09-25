const express = require("express");
const app = express();

app.get("/",async function(req,res){
  res.redirect("https://www.google.ru");
});

app.listen(3000);
