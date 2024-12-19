const express = require("express");
const axios = require("axios");
const router = express.Router();

// Fetch Spotify recommendations
router.get("/music", async (req, res) => {
  try {
    const response = await axios.get("https://api.spotify.com/v1/recommendations", {
      headers: { Authorization: `Bearer ${process.env.SPOTIFY_API_KEY}` },
      params: { seed_genres: "classical,jazz", limit: 5 },
    });
    res.json({ tracks: response.data.tracks });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch music recommendations" });
  }
});

// Fetch book suggestions
router.get("/books", async (req, res) => {
  try {
    const response = await axios.get("https://openlibrary.org/search.json", {
      params: { q: "adventure", limit: 5 },
    });
    res.json({ books: response.data.docs.slice(0, 5) });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch book suggestions" });
  }
});

module.exports = router;
