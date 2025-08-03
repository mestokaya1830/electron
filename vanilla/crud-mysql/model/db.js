const mysql = require('mysql2');
//with promise and run query as async await
const db = mysql.createPool({
   host:'localhost',
   user:'electron',
   password:'mk1972mk',
   database:'electron'
}).promise()

module.exports = db