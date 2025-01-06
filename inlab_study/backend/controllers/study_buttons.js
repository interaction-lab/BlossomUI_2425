// backend/controllers/buttons.js
const { exec } = require('child_process');
const path = require('path');

let intervalId = null;

exports.handleButtonPress = async (req, res) => {
    const buttonType = req.body.buttonType; // 'start' 'pause' or 'end'
    const scriptPath = path.join(__dirname, '..', 'scripts', 'study_script.py');

     // Start periodic idle behavior on 'start'
     if (buttonType === 'start') {
        if (!intervalId) {
            intervalId = setInterval(() => {
                exec(`python3 ${scriptPath} idle_behavior`, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Idle behavior error: ${error.message}`);
                    } else {
                        console.log(`Idle behavior output: ${stdout}`);
                    }
                });
            }, 15000); // 15 seconds
        }
    } 
    // Stop periodic execution on 'pause' or 'end'
    else if (buttonType === 'pause' || buttonType === 'end') {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }
    
    // Execute the primary Python command for the button press
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