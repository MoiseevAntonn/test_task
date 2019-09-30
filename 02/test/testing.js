const axios = require("axios");


async function testRequest(){

  var globalFlag = false;
  var count = 0;

  setTimeout(()=>{
    globalFlag = true;
  },10000)

  while (!globalFlag) {
    count ++;
    try {
      var resultOfAuthoriz2 = await axios.get("http://localhost:3000/test");
    } catch (e) {
      console.log(e);
    }
  }
  console.log(`За 10 секунд было обработано : ${count} запросов`);

}

console.log("тест начинается");
testRequest();
testRequest();
testRequest();
testRequest();
testRequest();

// app.listen(4000);
