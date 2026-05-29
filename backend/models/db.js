const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

console.log("Conectando a Supabase con DATABASE_URL:", process.env.DATABASE_URL ? "✅ definida" : "❌ no definida");

module.exports = pool;