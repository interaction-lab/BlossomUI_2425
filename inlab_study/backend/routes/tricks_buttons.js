const express = require('express');
const router = express.Router();
const trickController = require('../controllers/tricks_buttons');

router.post('/press', trickController.handleTrickButtonPress);

module.exports = router;
