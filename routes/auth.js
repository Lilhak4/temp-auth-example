'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');

const saltRounds = 10;

/* GET users listing. */
router.get('/signup', (req, res, next) => {
  if (req.session.currentUser) {
    res.redirect('/');
    return;
  }

  res.render('auth/signup');
});

router.post('/signup', (req, res, next) => {
  if (req.session.currentUser) {
    res.redirect('/');
    return;
  }
  if (!req.body.username || !req.body.password) {
    res.redirect('/auth/signup');
    return;
  }
  User.find({username: req.body.username})
    .then((user) => {
      if (user.length) {
        return res.redirect('/auth/signup');
      }

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);

      const newUser = new User({
        username: req.body.username,
        password: hashedPassword
      });

      newUser.save()
        .then(() => {
          req.session.currentUser = newUser;
          res.redirect('/');
        })
        .catch(next);
    })
    .catch(next);
});

router.get('/login', (req, res, next) => {
  if (req.session.currentUser) {
    res.redirect('/');
    return;
  }

  res.render('auth/login');
});

router.post('/login', (req, res, next) => {
  if (req.session.currentUser) {
    res.redirect('/');
    return;
  }
  if (!req.body.username || !req.body.password) {
    res.redirect('/auth/login');
    return;
  }
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          req.session.currentUser = user;
          res.redirect('/');
        } else {
          res.redirect('/auth/login');
        }
      }
    });
  // Check if user already exists
  // If user doesn't exist, redirect to sign up
  // If user exists check the password and log in if the password is correct
  //
});

module.exports = router;
