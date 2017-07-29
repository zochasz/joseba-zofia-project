const express = require('express');
const router = express.Router();
const TYPES = require('../models/product-types');
const Event = require('../models/event');
const User = require('../models/user');

router.get('/calendar', (req, res, next) => {

  User.findById(req.user._id).populate('_events').exec((err, user) => {

        if (err) {
          return next(err);
        }
        res.render('event/clientAgenda', { events: user._events });
    });
});

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

router.post("/:id/calendar", (req, res, next) => {

  const eventId = req.params.id;
  const userId = req.user._id;

  User.findById(userId, (err, user) => {
      if (err) { return next (err); }
      user._events.push(eventId);
      user.save( res.redirect('/event/calendar'));

  });
});

router.post("/:id/delete", (req, res, next) => {

  const eventId = req.params.id;
  const userId = req.user._id;

  User.findById(userId, (err, user) => {
      if (err) { return next (err); }
      var index = user._events.indexOf(eventId);
      console.log(index);
      if (index > -1) {
          user._events.splice(index, 1);
      }
      user.save( res.redirect('/event/calendar'));

    });
});

module.exports = router;
