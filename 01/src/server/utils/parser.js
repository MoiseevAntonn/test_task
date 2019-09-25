module.exports.buildListOfCurrencies = function(codes){
  var codesList = [];
  for (var curr in codes){
    codesList.push({
      value : curr,
      label : curr
    })
  }
  return codesList;
}
