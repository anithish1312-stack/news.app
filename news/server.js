require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.NEWS_KEY;
let savedArticles = []; // In-memory storage for "Read Later"

// Get news by category
app.get("/news", async (req, res) => {
  const category = req.query.category || "general";
  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`;
  
  try {
    const response = await axios.get(url);
    res.json(response.data.articles);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

// Save article to "Read Later"
app.post("/save", (req, res) => {
  const article = req.body;
  savedArticles.push(article);
  res.json({ message: "Article saved" });
});

// Get saved articles
app.get("/saved", (req, res) => {
  res.json(savedArticles);
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));