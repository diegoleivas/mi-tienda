const { Pool } = require("pg");

const pool = new Pool({
  host: "aws-0-us-east-1.pooler.supabase.com",
  port: 5432,
  database: "postgres",
  user: "postgres.bswntxfgpuhvvqolraeg",
  password: "Fileteando2024",
  ssl: {
    rejectUnauthorized: false
  }
});

console.log("Conectando a Supabase...");

module.exports = pool;