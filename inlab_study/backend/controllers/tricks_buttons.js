const { exec } = require('child_process');
const path = require('path');

const scriptPath = path.join(__dirname, '..', 'scripts', 'tricks_script.py');

exports.handleTrickButtonPress = (req, res) => {
    const trickType = req.body.buttonType; // 'trick_1', 'trick_2', etc.

    exec(`python3 ${scriptPath} ${trickType}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error}`);
            return res.status(500).json({ error: error.message });
        }
        console.log(`Python output: ${stdout}`);
        res.json({
            success: true,
            message: `${trickType.toUpperCase()} button pressed!`,
            output: stdout
        });
    });
};
