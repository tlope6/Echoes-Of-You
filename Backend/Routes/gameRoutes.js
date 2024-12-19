const express = require("express");
const router = express.Router();
const outcomes = require("../data/outcomes");

// Player data
let playerData = {
  creativity: 0,
  kindness: 0,
  adventure: 0,
  choices: [],
};

// Make a choice
router.post("/make_choice", (req, res) => {
  const { choice } = req.body;

  if (!outcomes[choice]) {
    return res.status(400).json({ error: "Invalid choice" });
  }

  // Update stats
  Object.keys(outcomes[choice]).forEach((key) => {
    if (key !== "story") {
      playerData[key] += outcomes[choice][key];
    }
  });
  playerData.choices.push(choice);

  res.json({ message: "Choice made successfully", playerData });
});

// Get player artifact
router.get("/artifact", (req, res) => {
  const artifact = `Your journey reflects an adventurous and creative spirit with decisions like ${playerData.choices.join(", ")}.`;
  res.json({ artifact, playerData });
});

module.exports = router;
