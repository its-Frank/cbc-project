const mysql = require("mysql2/promise")

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "cbc_edu_triad",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

// Helper function to execute queries
const db = {
  query: async (sql, params) => {
    try {
      const [rows] = await pool.execute(sql, params)
      return rows
    } catch (error) {
      console.error("Database error:", error)
      throw error
    }
  },

  // Close all connections in the pool (useful for testing)
  end: async () => {
    await pool.end()
  },
}

module.exports = db

