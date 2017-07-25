const express = require('express');
const router = express.Router();
const TYPES = require('../models/product-types');
const Event = require('../models/event');
const User = require('../models/user');

router.get('/', (req, res, next) => {
  const productTypes = req.body.productTypes;
  if (productTypes===null) {productTypes=""};
  Event.find({productTypes}, (err, events) => {
     if (err) {
       return next(err);
     }
     console.log(events);
     res.render('index', { TYPES, events });
  });
});

module.exports = router;
