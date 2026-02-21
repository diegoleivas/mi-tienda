const mysql = require("mysql2/promise");

const config = {
  host: process.env.MYSQLHOST || "localhost",
  user: process.env.MYSQLUSER || "diego",
  password: process.env.MYSQLPASSWORD || "1234",
  database: process.env.MYSQLDATABASE || "tienda",
  port: process.env.MYSQLPORT || 3306,
};

const connection = mysql.createPool(config);

// Log de conexión
console.log("Conectando a la base:", config.host, ":", config.port, "DB:", config.database);
console.log(process.env.MYSQLUSER, process.env.MYSQLPASSWORD);

module.exports = connection;
