const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();

const router = express.Router();
const port = 5000;
const SECRET_KEY = 'your_secret_key';

app.use(express.json());
app.use(cors());

// Initialize SQLite Database
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run(`CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )`);
});

// Register Route
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashedPassword], function (err) {
    if (err) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const token = jwt.sign({ id: this.lastID, username }, SECRET_KEY, { expiresIn: '1h' });
    res.status(201).json({ token });
  });
});

app.get("/", (req, res) => {
  res.send("App is running..");
});

// Login Route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
    if (err || !user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  });
});

app.use("/.netlify/functions/app", router);
module.exports.handler = serverless(app);

// Start the server
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });
