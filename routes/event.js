const express = require('express');
const router = express.Router();
const TYPES = require('../models/product-types');
const Event = require('../models/event');

router.get('/:id', (req, res, next) => {

  Event.findById(req.params.id, (err, event) => {

      if (err) {
        return next(err);
      }
      res.render('event/show', {
        event, TYPES
      });
  });
});

module.exports = router;
