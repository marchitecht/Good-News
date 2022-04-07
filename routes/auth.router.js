const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

router.route('/signup')
  .get((req, res) => {
    res.render('signup');
  });

router.route('/signin')
  .get((req, res) => {
    res.render('signin');
  });

module.exports = router;
