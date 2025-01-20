//routes/volume.js

const express = require('express'); 
const router = express.Router(); 
const volumeController = require('../controllers/volume');

router.get('/get', volumeController.getVolume); //getter
router.post('/set', volumeController.setVolume); //setter

module.exports = router;