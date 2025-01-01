// routes/brightness.js
const express = require('express');
const router = express.Router();
const brightnessController = require('../controllers/brightness');

router.get('/get', brightnessController.getBrightness);
router.post('/set', brightnessController.setBrightness);

module.exports = router;