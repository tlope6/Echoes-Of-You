const express = require("express");

// Update the import statements to use the correct casing
const gameRoutes = require("./Routes/gameRoutes");
const apiRoutes = require("./Routes/apiRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());

// Mount routes
app.use("/api/game", gameRoutes);
app.use("/api/external", apiRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
