const express = require('express');
const router = express.Router();
const TYPES = require('../models/product-types');
const Event = require('../models/event');
const User = require('../models/user');
const moment = require('moment');

router.get('/', (req, res, next) => {

  Event.find({}).sort({datetime: 1}).exec( (err, events) => {
      if (err) {
        return next(err);
      }
    res.render('index', { TYPES, events });
  });
});

router.get('/search', (req, res, next) => {

  const product_types = req.query.product_types;
  const where_find = req.query.where_find;

  console.log(product_types, where_find);

  if (where_find === "option1"){
    Event.find({ products: product_types }, (err, events) => {
       if (err) {
         return next(err);
       }
       console.log(events);
     res.json( { events } );
    });
  }
  else if (where_find === "option2"){
    User.find({ products: product_types }, (err, users) => {
       if (err) {
         return next(err);
       }
       console.log(users);
       res.json( { users } );
    });
  }
});

module.exports = router;
