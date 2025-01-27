// middleware/buttonMiddleware.js
const validateButtonType = (req, res, next) => {
    const validButtons = ['start', 'pause', 'end', 'idle_behavior', 'trick_1', 'trick_2', 'trick_3', 'trick_4','trick_5', 'trick_6'];
    const buttonType = req.body.buttonType?.toLowerCase();

    if (!buttonType) {
        return res.status(400).json({ error: 'Button type is required' });
    }

    if (!validButtons.includes(buttonType)) {
        return res.status(400).json({ 
            error: 'Invalid button type',
            validTypes: validButtons
        });
    }

    // Transform the button type to a consistent format
    req.body.buttonType = buttonType;
    next();
};

const logButtonPress = (req, res, next) => {
    console.log(`Button pressed: ${req.body.buttonType} at ${new Date().toISOString()}`);
    next();
};

module.exports = {
    validateButtonType,
    logButtonPress
};