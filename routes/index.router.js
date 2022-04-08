const router = require('express').Router();
const { create } = require('hbs');
const { Tag, BWlist } = require('../db/models');

router.route('/')
.get( async (req, res) => {
  if (req.session.user) {
    const whiteList = await Tag.findAll({include:{ model:BWlist, where: {userId:req.session.user.id, isGood: true}},raw:true})
    const blackList = await Tag.findAll({include:{ model:BWlist, where: {userId:req.session.user.id, isGood: false}},raw:true})
    res.render('index', {whiteList,blackList});
  } else {
    res.render('index'); 
  }
});

router.post('/', async (req, res) => {
  const isGood = req.body.isGood;
  const userId = req.session.user.id;
  const newTag = await Tag.findOrCreate({where:{name:req.body.tagName}, raw:true});
  const tagId = newTag[0].id;
  await BWlist.findOrCreate({where: {tagId,userId,isGood}});
  res.sendStatus(200);
});

router.delete('/:name', async function (req, res, next) {
  const { name } = req.params;
  const tag = await Tag.findOne({where: {name}, raw: true})
  await BWlist.destroy({ where: { tagId: tag.id } });
  res.sendStatus(200);
});
module.exports = router;
