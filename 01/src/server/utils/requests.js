const axios = require("axios");
const consts = require("../../etc/CONSTS.json");

module.exports.getCurrencyCodes = function(){
  return axios.get(`https://free.currconv.com/api/v7/currencies?apiKey=${consts.key}`);
};

module.exports.getConversionInfo = function(fromCurr,toCurr){
  return axios.get(`https://free.currconv.com/api/v7/convert?q=${fromCurr.value}_${toCurr.value}&compact=y&apiKey=${consts.apiKey}`)
};
