const express = require('express');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const TYPES = require('../models/product-types');
const User = require('../models/user');

router.get('/favourites', ensureLoggedIn('/'), (req, res, next) => {
  User.findById(req.user._id).populate({path:'_favourites',populate:{path:'products'}}).exec((err, user) => {

        if (err) {
          return next(err);
        }
        res.render('producer/favourites', { users: user._favourites });
    });
});

router.get('/:id', (req, res, next) => {

  User.findById(req.params.id).populate('products').exec((err, user) => {

      if (err) {
        return next(err);
      }
      res.render('producer/show', {
        user
      });
  });
});


router.post("/:id/favourites", ensureLoggedIn('/'), (req, res, next) => {

  const producerId = req.params.id;
  const userId = req.user._id;

  User.findById(userId, (err, user) => {
      if (err) { return next (err); }
      user._favourites.push(producerId);
      user.save( res.redirect('/producer/favourites'));

    });
});

router.post("/:id/rating", (req, res, next) => {

  const producerId = req.params.id;
  const userId = req.user._id;
  const stars = req.query.stars;
  const rate = { _id: userId, stars: stars }

  User.findById(producerId, (err, user) => {
      if (err) { return next (err); }
      user.rate.push(rate);
      user.save( res.redirect('/producer/show'));

    });
});

router.post("/:id/delete", ensureLoggedIn('/'), (req, res, next) => {

  const producerId = req.params.id;
  const userId = req.user._id;

  User.findById(userId, (err, user) => {
    if (err) { return next (err); }
    var index = user._favourites.indexOf(producerId);
    if (index > -1) {
        user._favourites.splice(index, 1);
    }
    user.save( res.redirect('/producer/favourites'));

    });
});

module.exports = router;
