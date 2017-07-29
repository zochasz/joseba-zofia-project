const express = require('express');
const router = express.Router();
const TYPES = require('../models/product-types');
const User = require('../models/user');

router.get('/:id', (req, res, next) => {

  User.findById(req.params.id, (err, user) => {

      if (err) {
        return next(err);
      }
      res.render('producer/show', {
        user, TYPES
      });
  });
});

router.post("/:id/favorites", (req, res, next) => {

  const producerId = req.params.id;
  const userId = req.user._id;

  User.findById(userId, (err, user) => {
      if (err) { return next (err); }
      user._favourites.push(producerId);
      user.save( res.redirect('/'));

    });
  });

module.exports = router;
