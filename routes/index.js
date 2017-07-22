const express = require('express');
const router = express.Router();
const TYPES = require('../models/product-types');
const Event = require('../models/event');
const User = require('../models/user');

router.get('/', (req, res, next) => {
  Event.find({}, (err, events) => {
     if (err) {
       return next(err);
     }
     res.render('index', { TYPES, events });
  });
});




module.exports = router;
