// server.js - FIXED
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const brightnessRoutes = require('./routes/brightness');
const buttonRoutes = require('./routes/buttons');
const studyButtonRoutes = require('./routes/study_buttons');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/brightness', brightnessRoutes); //this is all you need for routes

// Add a root route
app.get('/', (req, res) => {
  res.json({ 
      message: 'Button API Server Running',
      endpoints: {
          buttons: '/buttons/press',
          study_buttons: '/study_buttons/press'
      }
  });
});

// Button routes
app.use('/buttons', buttonRoutes);

// Button routes
app.use('/study_buttons', studyButtonRoutes);

// Database Setup
const db = new sqlite3.Database('./settings.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// API Endpoints
app.post('/save-settings', (req, res) => {
  const { userId, brightness, volume } = req.body;

  if (!userId || brightness === undefined || volume === undefined) {
    return res.status(400).json({ error: 'Invalid request. Missing parameters.' });
  }

  const query = `
    INSERT INTO settings (user_id, brightness, volume)
    VALUES (?, ?, ?)
    ON CONFLICT(user_id) DO UPDATE SET
      brightness = excluded.brightness,
      volume = excluded.volume
  `;
  db.run(query, [userId, brightness, volume], function (err) {
    if (err) {
      console.error('Error saving settings:', err.message);
      res.status(500).json({ error: 'Failed to save settings.' });
    } else {
      res.status(200).json({ message: 'Settings saved successfully!' });
    }
  });
});

app.get('/get-settings/:userId', (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: 'Invalid request. Missing userId.' });
  }

  const query = `SELECT brightness, volume FROM settings WHERE user_id = ?`;
  db.get(query, [userId], (err, row) => {
    if (err) {
      console.error('Error fetching settings:', err.message);
      res.status(500).json({ error: 'Failed to fetch settings.' });
    } else if (row) {
      res.status(200).json(row);
    } else {
      res.status(404).json({ error: 'Settings not found for this user.' });
    }
  });
});

// Add more detailed logging
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log('Available routes:');
  console.log('  POST /buttons/press');
});