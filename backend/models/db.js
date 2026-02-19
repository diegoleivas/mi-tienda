
const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  host: "localhost",
  user: "diego",
  password: "1234",
  database: "tienda"
});

module.exports = connection;  
