const express = require("express");
const multer = require("multer");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

// Set up multer for file upload
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:5173" }));

// Image classification endpoint
app.post("/classify", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Call Azure Custom Vision Prediction API
    const response = await axios.post(
      process.env.AZURE_ENDPOINT,
      req.file.buffer,
      {
        headers: {
          "Prediction-Key": process.env.AZURE_KEY,
          "Content-Type": "application/octet-stream",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error classifying image:", error.response?.data);
    res.status(500).json({ error: "Failed to classify image" });
  }
});

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is On`);
});
