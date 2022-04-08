const router = require('express').Router();
const { create } = require('hbs');
const { Tag, BWlist } = require('../db/models');

router.route('/')
.get( async (req, res) => {
  const whiteList = await BWlist.findAll({where:{userId:req.session.user.id, isGood: true}, include:'Tag' })
  console.log(whiteList);
    res.render('index', {whiteList});
  });
router.post('/', async (req, res) => {
  const isGood = req.body.isGood;
  const userId = req.session.user.id;
  const newTag = await Tag.findOrCreate({where:{name:req.body.tagName}, raw:true});
  const tagId = newTag[0].id;
  await BWlist.create({tagId,userId,isGood});
  res.sendStatus(200);
});
module.exports = router;
