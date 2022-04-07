const axios = require('axios');

const { News, Source } = require('../db/models');

// const getSource = async () => {
//   const result = await ax
// }

const getNews = async () => {
  const result = await axios('https://newsapi.org/v2/everything?q=man&page=2&apiKey=8c6c3659c35a4d2d834d57844a31af65');
  const arr = result.data.articles;

  return arr;
};
// getNews();
getNews().then(async (data) => {
  const data2 = [...data];
  data.map((el) => createSource(el));
  const sources = await Source.findAll({ raw: true });
  data2.map((el) => createInDb(el, sources));
  console.log(sources);
});

async function createInDb(elem, sources) {
  await News.create({
    title: elem.title, body: elem.content, img: elem.urlToImage, sourceId: sources.find((e) => e.name === elem.source.name).id,
  });
}

async function createSource(elem) {
  await Source.findOrCreate({ where: { name: elem.source.name } });
}
// async function createInDb(news) {
//   console.log('------->',news);
//   const allNews = await news.map(async (el) => {
//     await News.create({
//       title: el.title, body: el.content, img: el.urlToImage, sourceId: el.source.name,
//     });
//   });
//   console.log(allNews);
//   return allNews;
// }
// // createInDb(getNews);
