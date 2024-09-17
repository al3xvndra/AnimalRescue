const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
require("dotenv").config({ path: __dirname + "/./../../.env" });

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Allow only your React frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Allow credentials like cookies
}));
app.use(express.json());

// Create a connection pool to the database
const pool = mysql.createPool({
  host: "mysql",
  user: "root",
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: "my_database",
  port: 3306,
});

// Lost & found page
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

// Report form submission
app.post("/reports", async (req, res) => {
  const { animal, pickup, dropoff, color, status, authorId, message } = req.body;

  try {
    // SQL query to insert the form data into the reports table
    const sqlQuery = `
      INSERT INTO reports (animal, pickup, dropoff, color, status, authorId, message)
      VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [animal, pickup, dropoff, color, status, authorId, message];

    // Execute the query
    const [result] = await pool.query(sqlQuery, values);

    // Send back success response
    res.status(201).json({ message: "Report submitted successfully", reportId: result.insertId });
  } catch (error) {
    console.error("Error inserting report:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Threads page

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

app.post("/comments", async (req, res) => {
  const { threadId, commenterId, commenterName, comment } = req.body;

  if (!comment || !commenterId || !commenterName || !threadId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Insert the comment into the 'comments' table
    const sqlQuery = `
      INSERT INTO comments (threadId, commenterId, commenterName, comment)
      VALUES (?, ?, ?, ?)`;
    const values = [threadId, commenterId, commenterName, comment];

    const [result] = await pool.query(sqlQuery, values);

    res.status(201).json({ message: "Comment added successfully", commentId: result.insertId });
  } catch (error) {
    console.error("Error inserting comment:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/create-threads", async (req, res) => {
  const { authorId, title, content } = req.body;

  try {
    // SQL query to insert the form data into the reports table
    const sqlQuery = `
      INSERT INTO threads (authorId, title, content)
      VALUES (?, ?, ?)`;
    const values = [authorId, title, content];

    // Execute the query
    const [result] = await pool.query(sqlQuery, values);

    // Send back success response
    res.status(201).json({ message: "Thread submitted successfully", reportId: result.insertId });
  } catch (error) {
    console.error("Error inserting report:", error);
    res.status(500).send("Internal Server Error");
  }
});


// Start the Express server
app.listen(8080);
