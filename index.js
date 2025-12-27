const express = require("express");
const path = require("path");
const { fileURLToPath } = require("url");

// Required to emulate __dirname in ES modules
const app = express();

// Serve static files from /public
app.use(express.static(path.join(__dirname, "public")));

// Explicit root route (optional but recommended)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api/config", (req, res) => {
  res.json({
    mapboxToken: process.env.MAPBOX_TOKEN,
    moonPhaseToken: process.env.MOONPHASE_TOKEN
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});