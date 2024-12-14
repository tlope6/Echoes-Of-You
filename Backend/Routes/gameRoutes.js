const express = require('express');
const router = express.Router();
const outcomes = require('../data/outcomes');

let playerData = {
    creativity: 0,
    kindness: 0,
    adventure: 0,
    choices: [],
};

router.post('/make_choice', (req, res) => {
    const { choice } = req.body;

    if (outcomes[choice]) {
        Object.keys(outcomes[choice]).forEach((key) => {
            playerData[key] += outcomes[choice][key];
        });
        playerData.choices.push(choice);

        res.json({ message: "Choice saved!", playerData });
    } else {
        res.status(400).json({ error: "Invalid choice!" });
    }
});

router.get('/artifact', (req, res) => {
    const summary = `You created a path full of ${playerData.choices.join(', ')}, reflecting your adventurous and creative spirit!`;
    res.json({ summary, playerData });
});

module.exports = router;
