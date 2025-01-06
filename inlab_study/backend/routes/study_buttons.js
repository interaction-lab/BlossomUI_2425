// backend/routes/buttons.js
const express = require('express');
const router = express.Router();
const buttonController = require('../controllers/study_buttons');
const { validateButtonType, logButtonPress } = require('../../middleware/buttonMiddleware');


router.post('/press',   
            validateButtonType, //validate first
            logButtonPress, //then log
            buttonController.handleButtonPress); //then handle

module.exports = router;