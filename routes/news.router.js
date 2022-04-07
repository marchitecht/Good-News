const router = require('express').Router();
const {Tag} = require
router.route('/')
  .get(async (req, res) => {
    const apiKey = '8c6c3659c35a4d2d834d57844a31af65';
    const url = `https://newsapi.org/v2/everything?q=${topic}&apiKey=${apiKey}`;
    const result = await fetch(url);
    const data = 
  });
module.exports = router;
