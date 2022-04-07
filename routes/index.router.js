const router = require('express').Router();
const { Tags } = require('../db/models');

router.route('/')
  .get((req, res) => {
    res.render('index');
  });
router.post('/', async (req, res) => {
  console.log('===>',req.body);
  console.log(req.session.user);
  res.sendStatus(200);
  // try {
  //   const tag = await Tags.create({ name });
  //   res.json(tags);
  // } catch (error) {
  //   console.log(error);
  // }
});
module.exports = router;
