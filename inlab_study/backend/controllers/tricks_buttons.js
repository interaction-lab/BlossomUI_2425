// backend/controllers/tricks_buttons.js
const { exec } = require('child_process');
const path = require('path');

exports.handleButtonPress = async (req, res) => {
    const buttonType = req.body.buttonType; // 'trick_1', 'trick_2', etc...
    const scriptPath = path.join(__dirname, '..', 'scripts', 'trick_script.py'); // Change this if you have a different script for tricks

    // Execute the Python command for the button press
    exec(`python3 ${scriptPath} ${buttonType}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error}`);
            return res.status(500).json({ error: error.message });
        }
        console.log(`Python output: ${stdout}`);
        res.json({
            success: true,
            message: `${buttonType.toUpperCase()} button pressed!`,
            output: stdout
        });
    });
};
