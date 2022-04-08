  const router = require('express').Router();
  const bcrypt = require('bcrypt');
  const { User } = require('../db/models');

  router.route('/signup')
    .get((req, res) => {
      res.render('signup');
    }).post(async (req, res) => {
      const { name, email, password } = req.body;
      if (name && email && password) {
        const secretPass = await bcrypt.hash(password, 10);
        try {
          const newUser = await User.create({ name, email, password: secretPass });
          res.locals.user = newUser;
          req.session.user = { id: newUser.id, name: newUser.name };
          return res.redirect('/');
        } catch (err) {
          console.log(err);
          res.redirect('/');
        }
      } else {
        res.redirect('/');
      }
    });

  router.route('/signin')
    .get((req, res) => {
      res.render('signin');
    }).post(async (req, res) => {
      const { email, password } = req.body;
      if (email && password) {
        try {
          const currUser = await User.findOne({
            where: {
              email,
            },
          });
          // eslint-disable-next-line max-len
          if (bcrypt.compare(password, currUser.password)) {
            req.session.user = { id: currUser.id, name: currUser.name };
            res.locals.user = currUser;
            res.redirect('/');
          } else {
            res.redirect('/');
          }
        } catch (err) {
          console.log(err);
          res.redirect('/');
        }
      } else res.redirect('/');
      // eslint-disable-next-line max-len
    });

  router.get('/logout', (req, res) => {
    req.session.destroy();
    res.clearCookie('sid').redirect('/');
  });

  module.exports = router;
