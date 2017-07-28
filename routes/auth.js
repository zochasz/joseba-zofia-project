const express = require('express');
const passport = require('passport');
const TYPES = require('../models/product-types');
const User = require('../models/user');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const router  = express.Router();

router.get('/signup', ensureLoggedOut(), (req, res) => {
    res.render('auth/signup', { TYPES });
});

router.post('/signup', ensureLoggedOut(), passport.authenticate('local-signup', {
  successRedirect : '/',
  failureRedirect : '/signup'
}));

router.get('/login', ensureLoggedOut(), (req, res) => {
    res.render('auth/login');
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successRedirect : '/',
  failureRedirect : '/login'
}));

router.post('/logout', ensureLoggedIn('/'), (req, res) => {
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

router.post('/profile', passport.authenticate('local-profile', {
  successRedirect : '/',
  failureRedirect : '/profile'
}));

module.exports = router;
