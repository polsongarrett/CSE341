//TA04 PLACEHOLDER
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('pages/ta04', {
    title: 'Team Activity 04',
    path: '/ta04', // For pug, EJS
    style: req.session.style,
    counter: req.session.counter
  });
});

router.get('/change-style', (req, res, next) => {

  res.render('pages/ta04', {
    title: 'Team Activity 04',
    path: '/ta04', // For pug, EJS
    style: req.session.style,
    counter: req.session.counter
  });
});

router.get('/counter', (req, res, next) => {
  res.render('pages/ta04', {
    title: 'Team Activity 04',
    path: '/ta04', // For pug, EJS
    style: req.session.style,
    counter: req.session.counter
  });
});

module.exports = router;
