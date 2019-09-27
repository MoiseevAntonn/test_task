const { Pool } = require("pg");

const pool = new Pool({
  user : "dbuser",
  database : "resume",
  password : "qwerty"
});

pool.on('error',(err,cilent) => {

})




module.exports.getUserByName = async function(name){
  var result = await pool.query("SELECT * FROM users WHERE name = $1",[name]);
  var user = null;
  if (result.rowCount > 0){
    user = result.row[0];
  }
  return user;
};

module.exports.getUserById = async function(id){
  var result = await pool.query("SELECT * FROM users WHERE id = $1",[id]);
  var user = null;
  if (result.rowCount > 0){
    user = result.row[0];
  }
  return user;
};

module.exports.createUser = async function(user){
  await pool.query("INSERT INTO users VALUES ( $1, $2)",[user.name,user.password]);
};

module.exports.createLink = async function(limkMap){
  await pool.query("INSERT INTO links VALUES ( $1, $2 ,$3 ,$4 )",[linkMap.id,linkMap.shortLink,linkMap.longLink,linkMap.count])
};

module.exports.getLink = async function(id){
  var result = pool.query("SELECT * FROM links WHERE id = $1",[id]);
  var link = null;
  if (result.rowCount > 0){
    link = result.row[0];
  }
  return link;
};

module.exports.incrementLink = async function(){

};
