// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

// Define Twitter API endpoint URLs
const BASE_URL = 'https://api.twitter.com/2/tweets';
const TWEETS_ENDPOINT = '/search/recent';
const LIKES_ENDPOINT = '/search/recent';

// Set up Twitter API authorization headers
const config = {
  headers: {
    'Authorization': `Bearer ${process.env.TWITTER_ACCESS_TOKEN}`,
  },
};

// Route to fetch Formula 1 tweets
app.get('/formula1-tweets', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}${TWEETS_ENDPOINT}?query=Formula1`, config);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching Formula 1 tweets:', error.message);
    res.status(500).json({ error: 'Unable to fetch tweets' });
  }
});

// Route to fetch Formula 1 tweets with most likes
app.get('/formula1-most-likes', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}${LIKES_ENDPOINT}?query=Formula1&max_results=10&expansions=author_id`, config);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching Formula 1 tweets with most likes:', error.message);
    res.status(500).json({ error: 'Unable to fetch tweets with most likes' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});