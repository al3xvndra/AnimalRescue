const express = require("express");
const mysql = require("mysql2/promise");
require("dotenv").config({ path: __dirname + "/./../../.env" });

const app = express();

// Create a connection pool to the database
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: "my_database",
  port: 3306,
});

// An example async function to run your queries
async function runQueries() {
  try {
    // Create a connection from the pool
    const connection = await pool.getConnection();

    try {
      // Query using the connection
      const [results, fields] = await connection.query(
        "SELECT * FROM `reports` WHERE `color` = ?",
        ["brown"]
      );

      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
    } finally {
      // Always release the connection back to the pool
      connection.release();
    }
  } catch (err) {
    console.log(err);
  }
}

// Example usage
runQueries();

// Start the Express server
app.listen(8080, () => {
  console.log("Server running on port 8080");
});
