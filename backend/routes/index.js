const express = require('express');
const router = express.Router();

const NEWS_API_KEY = process.env.NEWS_API_KEY;

router.get('/articles', (req, res) => {
  fetch(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${NEWS_API_KEY}`)
    .then(response => response.json())
    .then(data => {
      if (data.status === 'ok') {
        res.json({ result: true, articles: data.articles });
      } else {
        res.json({ result: false, articles: [] });
      }
    });
});

module.exports = router;