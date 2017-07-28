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

module.exports = router;
