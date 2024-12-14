const express = require('express');
const app = express();
const gameRoutes = require('./routes/gameRoutes');

app.use(express.json());
app.use('/api/game', gameRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
