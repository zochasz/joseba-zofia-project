const express = require('express');
const passport = require('passport');
const router  = express.Router();

router.get('/signup', (req, res) => {
    res.render('auth/signup');
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

module.exports = router;