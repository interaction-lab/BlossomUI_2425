// backend/routes/tricks_buttons.js
const express = require('express');
const router = express.Router();
const buttonController = require('../controllers/tricks_buttons');
const { validateButtonType, logButtonPress } = require('../../middleware/buttonMiddleware');


router.post('/press', 
    validateButtonType, // Validate first
    logButtonPress, // Log the press
    buttonController.handleButtonPress // Handle the button press
);

module.exports = router;