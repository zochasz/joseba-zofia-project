const express = require('express');
const router = express.Router();
const TYPES = require('../models/product-types');
const Event = require('../models/event');

router.get('/', (req, res, next) => {
  const events = Event.find({products: "Eggs"});
  console.log(events);
  res.render('index', { TYPES, events });
});

// router.get('/', (req, res, next) => {
//   Event
//     .find({})
//     .populate('_creator')
//     .exec( (err, events) => {
//       console.log(events);
//       res.render('index', { TYPES });
//     });
// });

// router.post('/', (req, res, next) => {
//   const events = Event.find({})
//       console.log(events);
//       res.render('index', { events });
//     });
// });


module.exports = router;
