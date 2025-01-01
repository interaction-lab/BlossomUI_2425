// controllers/brightness.js --> for MACOS 
let mockBrightness = 100;  // Store brightness in memory for development

exports.getBrightness = async (req, res) => {
    // Just return mock value during development
    res.json(mockBrightness);
};

exports.setBrightness = async (req, res) => {
    mockBrightness = req.body.brightness;
    console.log('Mock brightness set to:', mockBrightness);
    res.json({ success: true });
};

// controllers/brightness.js for Pi
/*const fs = require('fs').promises;

exports.getBrightness = async (req, res) => {
    const maxBrightness = parseInt(await fs.readFile('/sys/class/backlight/rpi_backlight/max_brightness', 'utf8'));
    const currentBrightness = parseInt(await fs.readFile('/sys/class/backlight/rpi_backlight/brightness', 'utf8'));
    const percentage = Math.round((currentBrightness / maxBrightness) * 100);
    res.json(percentage);
};

exports.setBrightness = async (req, res) => {
    const maxBrightness = parseInt(await fs.readFile('/sys/class/backlight/rpi_backlight/max_brightness', 'utf8'));
    const value = Math.round((req.body.brightness / 100) * maxBrightness);
    await fs.writeFile('/sys/class/backlight/rpi_backlight/brightness', value.toString());
    res.json({ success: true });
};*/