const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
require("dotenv").config({ path: __dirname + "/./../../.env" });

const app = express();

app.use(cors());

// Create a connection pool to the database
const pool = mysql.createPool({
  host: "mysql",
  user: "root",
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: "my_database",
  port: 3306,
});

// lost & found page

app.get("/reports", async (req, res) => {
  try {
    const [reports] = await pool.query("SELECT * FROM reports");
    res.json(reports);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/reports/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [report] = await pool.query("SELECT * FROM reports WHERE id = ?", [id]);
    if (report.length > 0) {
      res.json(report[0]);
    } else {
      res.status(404).send("Animal not found");
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

// threads page

app.get('/threads', async (req, res) => {
  try {
    const [threads] = await pool.query('SELECT * FROM threads');
    res.json(threads);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.get('/threads/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [thread] = await pool.query('SELECT * FROM threads WHERE id = ?', [id]);
    if (thread.length === 0) {
      return res.status(404).send('Thread not found');
    }
    res.json(thread[0]);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.get('/comments', async (req, res) => {
  const { threadId } = req.query;
  try {
    const [comments] = await pool.query('SELECT * FROM comments WHERE threadID = ?', [threadId]);
    res.json(comments);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});


// Start the Express server
app.listen(8080);
