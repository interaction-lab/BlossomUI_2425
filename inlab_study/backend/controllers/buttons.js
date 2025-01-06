// backend/controllers/buttons.js
const { exec } = require('child_process');
const path = require('path');

exports.handleButtonPress = async (req, res) => {
    const buttonType = req.body.buttonType; // 'yes', 'no', 'maybe', or 'sometimes'
    const scriptPath = path.join(__dirname, '..', 'scripts', 'training_script.py');
    
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