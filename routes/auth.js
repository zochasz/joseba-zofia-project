const express = require('express');
const passport = require('passport');
const TYPES = require('../models/product-types');
const User = require('../models/user');
const router  = express.Router();

router.get('/signup', (req, res) => {
    res.render('auth/signup', { TYPES });
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/',
  failureRedirect : '/signup'
}));

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect : '/',
  failureRedirect : '/login'
}));

router.post('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/profile', (req, res, next) => {
  User.findById(req.user._id, (err, user) => {
      if (err) {
        return next(err);
      }
      res.render('auth/profile', {
        user, TYPES
      });
  });
});

module.exports = router;
