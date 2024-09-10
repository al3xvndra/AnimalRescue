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

// async function runQueries() {
//   try {
//     // Create a connection from the pool
//     const connection = await pool.getConnection();

//     try {
//       // Query using the connection
//       const results = await connection.query(
//         "SELECT * FROM `reports` WHERE color=?",
//         ["white"]
//       );
//       console.log(results);
//     } finally {
//       connection.release();
//     }
//   } catch (err) {
//     console.log(err);
//   }
// }
// runQueries();

app.get("/reports", async function (request, response) {
  try {
    // Query the database
    const [reports] = await pool.query("SELECT * FROM reports");

    // Send the result back as JSON
    response.status(200).json(reports);
  } catch (error) {
    console.error("Error executing query:", error);
    response.status(500).send("Internal Server Error");
  }
});

// Start the Express server
app.listen(8080);
