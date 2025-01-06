// server.js - FIXED
const express = require('express');
const cors = require('cors');
const brightnessRoutes = require('./routes/brightness');
const buttonRoutes = require('./routes/buttons');
const studyButtonRoutes = require('./routes/study_buttons');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
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

// Add more detailed logging
app.listen(port, () => {
  console.log(`Server running at http://localhost:3000`);
  console.log('Available routes:');
  console.log('  POST /buttons/press');
});