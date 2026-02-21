const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  host: process.env.MYSQLHOST || "localhost",
  user: process.env.MYSQLUSER || "diego",
  password: process.env.MYSQLPASSWORD || "1234",
  database: process.env.MYSQLDATABASE || "tienda",
  port: process.env.MYSQLPORT || 3306,
});

console.log("Conectando a la base:", connection.options.host, ":", connection.options.port, "DB:", connection.options.database);

module.exports = connection;