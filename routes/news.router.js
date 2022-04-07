const router = require('express').Router();

router.route('/')
  .get(async (req, res) => {
    const apiKey = '8c6c3659c35a4d2d834d57844a31af65';
    const url = `https://newsapi.org/v2/everything?q=${topic}&apiKey=${apiKey}`;
    const result = await fetch(url);
    res.json(result);
  });
module.exports = router;
