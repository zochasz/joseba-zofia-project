const express = require('express');
const router = express.Router();
const ProductTypes = require('../models/product-types');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const Event = require('../models/event');
const User = require('../models/user');
require("dotenv").config();
const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_APIKEY
});
const moment = require('moment');

router.get('/new', ensureLoggedIn('/'), (req, res, next) => {
    ProductTypes.find({}, (err, productTypes) => {
      if (err) {
        return next(err);
      }
      res.render('event/new', { productTypes });
    });
});

router.post('/new', ensureLoggedIn('/'), (req, res, next) => {
  ProductTypes.find({}, (err, productTypes) => {
    if (err) {
      return next(err);
    }
    const _creator = req.user._id;
    const {
        title,
        description,
        datetimepicker,
        street,
        streetNo,
        zipCode,
        city,
        country
      } = req.body;
    const datetime = new Date(datetimepicker.substring(0,16).replace(" ","T"));

    let products = [];
    const reqBodyKeys = Object.keys(req.body);
    productTypes.forEach((type) => {
       if (reqBodyKeys.indexOf(type._id.toString()) !== -1) {
         products.push(type._id);
       }
    });

    const calculatedAddress = street + " " + streetNo + " " + zipCode + " " + city + " " + country;

    googleMapsClient.geocode({
      address: calculatedAddress
    }, function (err, response) {
      if (!err) {
        const latitude = response.json.results[0].geometry.location.lat;
        const longitude = response.json.results[0].geometry.location.lng;

        const newEvent = new Event({
           _creator,
           title,
           description,
           datetime,
           address: {
             street,
             streetNo,
             zipCode,
             city,
             country,
             latitude,
             longitude
           },
           products
        });
        newEvent.save((err) => {
          if (err) {
            console.log(err);
            next(err);
          } else {
            return res.redirect('/');
          }
        });
      }
    });
  });
});

router.get('/createdEvents', (req, res, next) => {

  Event.find({ _creator: req.user._id }).populate('products').exec((err, events) => {
        if (err) {
          return next(err);
        }
        res.render('event/producerAgenda', { events: events });
  });
});

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
      const month = moment(event.datetime).format('MMM');
      const dayWeek = moment(event.datetime).format('dddd');
      const day = moment(event.datetime).format('D');
      const hour = moment(event.datetime).format('H:mm');
      res.render('event/show', {
        event, month, dayWeek, day, hour
      });
  });
});

router.get('/:id/edit', (req, res, next) => {
 ProductTypes.find({}, (err, productTypes) => {
  if (err) {
    return next(err);
  }

  const eventId = req.params.id;
  Event.findById(eventId, (err, event) => {
    if (err) {
      return next(err);
    }
    res.render('event/edit', {
      event, productTypes
    });
  });
 });
});

router.post('/:id', ensureLoggedIn('/'), (req, res, next) => {

  ProductTypes.find({}, (err, productTypes) => {
    if (err) {
      return next(err);
    }

    const eventId = req.params.id;
    const _creator = req.user._id;
    const {
        title,
        description,
        datetimepicker,
        street,
        streetNo,
        zipCode,
        city,
        country
      } = req.body;
    const datetime = new Date(datetimepicker.substring(0,16).replace(" ","T"));

    let products = [];
    const reqBodyKeys = Object.keys(req.body);
    productTypes.forEach((type) => {
       if (reqBodyKeys.indexOf(type._id.toString()) !== -1) {
         products.push(type._id);
       }
    });

    const calculatedAddress = street + " " + streetNo + " " + zipCode + " " + city + " " + country;

    googleMapsClient.geocode({
      address: calculatedAddress
    }, function (err, response) {
      if (!err) {
        const latitude = response.json.results[0].geometry.location.lat;
        const longitude = response.json.results[0].geometry.location.lng;

        const updatedEvent = {
              _creator: _creator,
              title: title,
              description : description,
              datetime: datetime,
              address: {
                street: street,
                streetNo: streetNo,
                zipCode: zipCode,
                city: city,
                country: country,
                latitude: latitude,
                longitude: longitude
              },
              products: products
            };
        Event.findByIdAndUpdate(eventId, updatedEvent, (err, updatedEvent) => {
        if (err){ return next(err); }
            return res.redirect('/event/createdEvents');
        });
      }
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
