//for audio slider --> UI to speaker connection
// controllers/volume.js
let mockVolume = 100;  // Store volume in memory for development

// For development/testing
exports.getVolume = async (req, res) => {
    res.json(mockVolume);
};

exports.setVolume = async (req, res) => {
    mockVolume = req.body.volume;
    console.log('mock volume set to:', mockVolume);
    res.json({ success: true });
};

// For Raspberry Pi (uncomment when deploying)
/*
const util = require('util');
const exec = util.promisify(require('child_process').exec);

exports.getVolume = async (req, res) => {
    try {
        // amixer gets the current volume level
        const { stdout } = await exec("amixer get 'Master' | grep -o '[0-9]*%' | head -1");
        const volume = parseInt(stdout);
        res.json(volume);
    } catch (error) {
        console.error('Error getting volume:', error);
        res.status(500).json({ error: 'Failed to get volume' });
    }
};

exports.setVolume = async (req, res) => {
    try {
        const volume = req.body.volume;
        // amixer sets the volume level
        await exec(`amixer set 'Master' ${volume}%`);
        res.json({ success: true });
    } catch (error) {
        console.error('Error setting volume:', error);
        res.status(500).json({ error: 'Failed to set volume' });
    }
};
*/