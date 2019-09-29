const { Pool } = require("pg");
const { database } = require("../../etc/config.json");

const pool = new Pool(database);

pool.on('error',(err,cilent) => {
  console.log(err);
  pool.end();
})




module.exports.getUserByName = async function(name){
  var result = await pool.query("SELECT * FROM users WHERE name = $1",[name]);
  var user = null;
  if (result.rowCount > 0){
    user = result.rows[0];
  }
  return user;
};

module.exports.getUserById = async function(id){
  var result = await pool.query("SELECT * FROM users WHERE id = $1",[id]);
  var user = null;
  if (result.rowCount > 0){
    user = result.rows[0];
  }
  return user;
};

module.exports.createUser = async function(user){
  await pool.query("INSERT INTO users (name,password) VALUES ( $1, $2)",[user.name,user.password]);
};

module.exports.createLink = async function(linkMap){
  await pool.query("INSERT INTO links VALUES ( $1, $2 ,$3 ,$4 )",[linkMap.id,linkMap.shortLink,linkMap.longLink,linkMap.count])
};

module.exports.getLinks = async function(id){
  var result = await  pool.query("SELECT * FROM links WHERE id = $1",[id]);
  var links = [];
  if (result){
    links = result.rows;
  }
  return links;
};

module.exports.incrementLink = async function(id,shortLink){
  await pool.query("UPDATE links SET count = count + 1 WHERE id = $1 AND shortlink = $2",[id,shortLink])
};

// var users = [];
// var links = [];
//
//
// module.exports.getUserByName = async function(name){
//   var result = users.find(user => user.name === name);
//   return (result) ? result : null;
// };
//
// module.exports.getUserById = async function(id){
//   var result = users.find(user => user.id === id);
//   return (result) ? result : null;
// };
//
// module.exports.createUser = async function(user){
//   //await pool.query("INSERT INTO users VALUES ( $1, $2)",[user.name,user.password]);
//   var {name,password} = user;
//   if (users.findIndex(user => user.name === name) !== -1 ) throw new Error("user already excists");
//   users.push({
//     name,
//     password,
//     id:generateId()
//   })
// };
//
// module.exports.createLink = async function(linkMap){
//   //await pool.query("INSERT INTO links VALUES ( $1, $2 ,$3 ,$4 )",[linkMap.id,linkMap.shortLink,linkMap.longLink,linkMap.count])
//   links.push(linkMap);
// };
//
// module.exports.getLinks = async function(id){
//   var result = links.filter(link => link.id === id);
//   return (result) ? result : null;
// };
//
// module.exports.incrementLink = async function(){
//
// };
//
// function generateId(){
//   return Math.random().toString(36).substring(2, 15);
// }
