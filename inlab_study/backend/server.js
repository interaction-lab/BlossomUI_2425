// server.js - FIXED
const express = require('express');
const cors = require('cors');
const brightnessRoutes = require('./routes/brightness');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/brightness', brightnessRoutes);  // This is all you need for routes

// Remove the duplicate route handlers
// Delete the app.get('/brightness/get') and app.post('/brightness/set') blocks

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});