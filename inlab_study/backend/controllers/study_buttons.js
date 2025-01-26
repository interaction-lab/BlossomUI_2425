// backend/controllers/buttons.js
const { exec } = require('child_process');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Setup SQLite database
const db = new sqlite3.Database('./settings.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

let intervalId = null;

// Function to get volume setting from the database
const getVolumeSetting = (userId, callback) => {
    const query = `SELECT volume FROM settings WHERE user_id = ?`;
    db.get(query, [userId], (err, row) => {
        if (err) {
            console.error('Error fetching volume setting:', err.message);
            return callback(err, null);
        }
        if (row) {
            callback(null, row.volume); // Volume value (0-100)
        } else {
            console.error('Settings not found for this user.');
            callback('Settings not found', null);
        }
    });
};

exports.handleButtonPress = async (req, res) => {
    const buttonType = req.body.buttonType; // 'start' 'pause' or 'end'
    const participantId = req.body.participantId; // Get participant_id from request body
    const scriptPath = path.join(__dirname, '..', 'scripts', 'study_script.py');

    if (!participantId) {
        return res.status(400).json({ error: 'Participant ID is missing.' });
    }

    // Start periodic idle behavior on 'start'
    if (buttonType === 'start') {
        // Get volume setting from the database and adjust interval
        getVolumeSetting(participantId, (err, volume) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to fetch volume setting.' });
            }

            // Set the interval equal to the volume (in seconds)
            const intervalInSeconds = volume; // Interval equals volume setting (e.g., 48 seconds)

            if (!intervalId) {
                intervalId = setInterval(() => {
                    exec(`python3 ${scriptPath} idle_behavior ${participantId}`, (error, stdout, stderr) => {
                        if (error) {
                            console.log(`Idle behavior called: ${participantId}`);
                            console.error(`Idle behavior error: ${error.message}`);
                        } else {
                            console.log(`Idle behavior output: ${stdout}`);
                        }
                    });
                }, intervalInSeconds * 1000); // Convert seconds to milliseconds
            }
        });
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


