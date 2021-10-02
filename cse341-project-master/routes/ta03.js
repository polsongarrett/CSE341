const express = require('express');
const https = require('https');

const router = express.Router();
const fileName ='https://byui-cse.github.io/cse341-course/lesson03/items.json';

let contents='';

https.get(fileName,(res) => {
  let body = "";

  res.on("data", (chunk) => {
    body += chunk;
  });

  res.on("end", () => {
    try {
      contents = JSON.parse(body);
    } catch (error) {
      console.error(error.message);
    };
  });
}).on("error", (error) => {
    console.error(error.message);
});

router.get('/', (req, res, next) => {
  res.render('pages/ta03', {
    title: 'Team Activity 03',
    path: '/ta03', // For pug, EJS
    json: contents,
    filterMesh: contents
  });
});

router.get('/search', (req, res, next) => {
  let filterJson = contents;
  const search = req.query.keyword;

  if(search !== undefined) {
    filterJson = contents.filter((item)=>{
      const mesh = search;

      if(item.name.includes(mesh)||item.description.includes(mesh)) {
        return true;
      }

      for(tag of item.tags) {
        if(tag.includes(mesh)) {
          return true;
        } 
      }
    });
  }

  res.render('pages/ta03', {
    title: 'Team Activity 03',
    path: '/ta03', // For pug, EJS
    json: contents,
    filterMesh: filterJson
  });
});

module.exports = router;