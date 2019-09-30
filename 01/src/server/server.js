const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const consts = require("../etc/CONSTS.json");
const requests = require("./utils/requests.js");
const parser = require("./utils/parser.js");

const codes = require("./utils/codes.json");
const app = express();


app.use( bodyParser.json() );
app.use( express.static(path.resolve(__dirname,"../public")) );


app.post("/convert",async function(req,res){
  var {fromCurr,toCurr,value} = req.body;
  if (!fromCurr || !toCurr || value === undefined){
    res.status(400).end();
  }

  try {
    var conversionInfo = await requests.getConversionInfo(fromCurr,toCurr);
  } catch (e) {
    res.status(500).end();
    return
  }

  var conversionValue = conversionInfo["data"][`${fromCurr.value}_${toCurr.value}`]["val"];
  if (!conversionValue){
    res.status(400).end();
    return;
  }
  var result = value * conversionValue;
  result = result.toFixed(2);
  res.send({result : result})
});

app.get("/currCodes",async function(req,res){
  var codesList = parser.buildListOfCurrencies(codes);
  res.send(codesList);
})


app.listen(consts.port,()=>{
  console.log(`app is listened on port ${consts.port}`);
})
