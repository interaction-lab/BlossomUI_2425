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
const getBehaviorFrequency = (userId, callback) => {
    const query = `SELECT behaviorFrequency FROM settings WHERE user_id = ?`;
    db.get(query, [userId], (err, row) => {
        if (err) {
            console.error('Error fetching behavior setting:', err.message);
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

/*exports.handleButtonPress = async (req, res) => {
    const buttonType = req.body.buttonType; // 'start' 'pause' or 'end'
    const participantId = req.body.participantId; // Get participant_id from request body
    const scriptPath = path.join(__dirname, '..', 'scripts', 'study_script.py');

    if (!participantId) {
        return res.status(400).json({ error: 'Participant ID is missing.' });
    }

    // Start periodic idle behavior on 'start'
    if (buttonType === 'start') {
        // Get volume setting from the database and adjust interval
        getBehaviorFrequency(participantId, (err, behaviorFrequency) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to fetch volume setting.' });
            }

            // Set the interval equal to the volume (in seconds)
            const intervalInSeconds = behaviorFrequency; // Interval equals volume setting (e.g., 48 seconds)

            if (!intervalId) {
                sessionEndTime = Date.now() + (this.INITIAL_TIME * 1000);
                intervalId = setInterval(() => {
                    // Check if we're within 10 seconds of the session end time
                    if (Date.now() >= sessionEndTime - 10000) {
                        console.log('Session is about to end, stopping idle behavior.');
                        clearInterval(idleIntervalId);
                        idleIntervalId = null;
                        return; // Stop idle behavior
                    }

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

    // Handle the new 'session_complete' button press
    else if (buttonType === 'session_complete') {
        console.log(`Session completed for participant ${participantId}`);
        
        // Execute the Python script with 'session_complete' as an argument
        exec(`python3 ${scriptPath} session_complete ${participantId}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing session_complete script: ${error.message}`);
                return res.status(500).json({ error: `Error executing session_complete script: ${error.message}` });
            }

            if (stderr) {
                console.error(`Python script stderr: ${stderr}`);
            }

            console.log(`Python script stdout: ${stdout}`);

        });

    }


    // Stop periodic execution on 'pause' or 'end'
    else if (buttonType === 'pause' || buttonType === 'end') {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }

    // // Execute the primary Python command for the button press
    // exec(`python3 ${scriptPath} ${buttonType}`, (error, stdout, stderr) => {
    //     if (error) {
    //         console.error(`Error: ${error}`);
    //         return res.status(500).json({ error: error.message });
    //     }
    //     console.log(`Python output: ${stdout}`);
    //     res.json({
    //         success: true,
    //         message: `${buttonType.toUpperCase()} button pressed!`,
    //         output: stdout
    //     });
    // });
}*/

// backend/controllers/buttons.js
exports.handleButtonPress = async (req, res) => {
    const buttonType = req.body.buttonType;
    const participantId = req.body.participantId;
    const scriptPath = path.join(__dirname, '..', 'scripts', 'study_script.py');

    if (!participantId) {
        return res.status(400).json({ error: 'Participant ID is missing.' });
    }

    // Execute the Python command based on button type
    if (buttonType === 'idle_behavior') {
        exec(`python3 ${scriptPath} idle_behavior ${participantId}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error}`);
                return res.status(500).json({ error: error.message });
            }
            console.log(`Idle behavior output: ${stdout}`);
            res.json({ success: true });
        });
    } 
    else if (buttonType === 'session_complete') {
        exec(`python3 ${scriptPath} session_complete ${participantId}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error}`);
                return res.status(500).json({ error: error.message });
            }
            console.log(`Session complete output: ${stdout}`);
            res.json({ success: true });
        });
    }
    else {
        // Handle start, pause, end buttons
        exec(`python3 ${scriptPath} ${buttonType}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error}`);
                return res.status(500).json({ error: error.message });
            }
            console.log(`Button press output: ${stdout}`);
            res.json({ success: true });
        });
    }
};


