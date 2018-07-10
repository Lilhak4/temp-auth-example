'use strict';

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  if (!req.session.currentUser) {
    res.redirect('/auth/signup');
    return;
  }
  const data = {
    title: 'Express',
    counter: req.session.counter
  };
  res.render('index', data);
});

module.exports = router;
