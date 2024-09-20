const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
require("dotenv").config({ path: __dirname + "/./../../.env" });
const minLength = 1;

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

// Error handling
function getErrorMessagesForThreads(title, content) {
  const errorMessages = [];

  if (title.length < minLength) {
    errorMessages.push("The title field can't be empty.");
  }
  if (content.length < minLength) {
    errorMessages.push("The content field can't be empty.");
  }

  return errorMessages;
}

function getErrorMessagesForComments(name, content) {
  const errorMessages = [];

  if (name.length < minLength) {
    errorMessages.push("The name field can't be empty.");
  }
  if (content.length < minLength) {
    errorMessages.push("The content field can't be empty.");
  }

  return errorMessages;
}

function getErrorMessagesForReports(animal, pickup, dropoff, color, animalStatus, message) {
  const errorMessages = [];

  if (animal.length < minLength) {
    errorMessages.push("The animal field can't be empty.");
  }
  if (pickup.length < minLength) {
    errorMessages.push("The pickup field can't be empty.");
  }
  if (dropoff.length < minLength) {
    errorMessages.push("The dropoff field can't be empty.");
  }
  if (color.length < minLength) {
    errorMessages.push("The color field can't be empty.");
  }
  if (animalStatus.length < minLength) {
    errorMessages.push("The status field can't be empty.");
  }
  if (message.length < minLength) {
    errorMessages.push("The message field can't be empty.");
  }

  return errorMessages;
}

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
  const { animal, pickup, dropoff, color, animalStatus, authorId, message } = req.body;

  // Validate input
  const errorMessages = getErrorMessagesForReports(animal, pickup, dropoff, color, animalStatus, message);
  if (errorMessages.length > 0) {
    return res.status(400).json({ errors: errorMessages });
  }

  try {
    // SQL query to insert the form data into the reports table
    const sqlQuery = `
      INSERT INTO reports (animal, pickup, dropoff, color, animalStatus, authorId, message)
      VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [animal, pickup, dropoff, color, animalStatus, authorId, message];

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

  // Validate inputs using the error messages function
  const errorMessages = getErrorMessagesForComments(commenterName, comment);
  if (errorMessages.length > 0) {
    return res.status(400).json({ errors: errorMessages });
  }

  // Check if all required fields are provided
  if (!threadId || !commenterId) {
    return res.status(400).json({ message: "Thread ID and commenter ID are required" });
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

  // Call the error messages function for validation
  const errorMessages = getErrorMessagesForThreads(title, content);
  if (errorMessages.length > 0) {
    return res.status(400).json({ errors: errorMessages });
  }

  try {
    // SQL query to insert the form data into the threads table
    const sqlQuery = `
      INSERT INTO threads (authorId, title, content)
      VALUES (?, ?, ?)`;
    const values = [authorId, title, content];

    // Execute the query
    const [result] = await pool.query(sqlQuery, values);

    // Send back success response
    res.status(201).json({ message: "Thread submitted successfully", reportId: result.insertId });
  } catch (error) {
    console.error("Error inserting thread:", error);
    res.status(500).send("Internal Server Error");
  }
});


app.get('/edit-threads/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [threads] = await pool.query('SELECT * FROM threads WHERE id = ?', [id]);
    if (!threads.length) return res.status(404).json({ message: 'Thread not found' });
    res.status(200).json(threads[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching thread', error });
  }
});

app.post('/edit-threads/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const errorMessages = getErrorMessagesForThreads(title, content);
  if (errorMessages.length > 0) {
    return res.status(400).json({ errors: errorMessages });
  }

  try {
    const [result] = await pool.query('UPDATE threads SET title = ?, content = ? WHERE id = ?', [title, content, id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Thread not found or update failed' });

    const [updatedThread] = await pool.query('SELECT * FROM threads WHERE id = ?', [id]);
    res.status(200).json(updatedThread[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error updating thread', error });
  }
});


app.listen(8080);
