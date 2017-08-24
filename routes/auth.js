const express = require('express');
const passport = require('passport');
const TYPES = require('../models/product-types');
const User = require('../models/user');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const router  = express.Router();
const bcrypt            = require('bcrypt');
                          require("dotenv").config();
const googleMapsClient  = require('@google/maps').createClient({
  key: process.env.GOOGLE_APIKEY
});

router.get('/signup', ensureLoggedOut(), (req, res) => {
    res.render('auth/signup', { TYPES });
});

router.post('/signup', ensureLoggedOut(), passport.authenticate('local-signup', {
  successRedirect : '/',
  failureRedirect : '/signup'
}));

router.get('/login', ensureLoggedOut(), (req, res) => {
    res.render('auth/login');
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successRedirect : '/',
  failureRedirect : '/login'
}));

router.post('/logout', ensureLoggedIn('/'), (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/profile', ensureLoggedIn('/'), (req, res, next) => {
  User.findById(req.user._id, (err, user) => {
      if (err) {
        return next(err);
      }
      res.render('auth/profile', {
        user, TYPES
      });
  });
});

router.post('/profile', ensureLoggedIn('/'), (req, res, next) => {
  const {
        username,
        email,
        name,
        isProducer,
        street,
        streetNo,
        zipCode,
        city,
        country,
        description,
        url,
        phoneNo
      } = req.body;

      if (isProducer) {
        let products = [];
        if (req.body.productType1) {
          products.push("Fruit and Vegetables")
        };
        if (req.body.productType2) {
          products.push("Eggs")
        };
        if (req.body.productType3) {
          products.push("Milk and Cheese")
        };
        if (req.body.productType4) {
          products.push("Bread, Cereals and Bakery")
        };
        if (req.body.productType5) {
          products.push("Oil and Vinegar")
        }
        if (req.body.productType6) {
          products.push("Beer, Vine and Spirits")
        };
        if (req.body.productType7) {
          products.push("Meat")
        };
        if (req.body.productType8) {
          products.push("Cold Meat")
        };
        if (req.body.productType9) {
          products.push("Jams and Honey")
        };
        if (req.body.productType10) {
          products.push("Appetizers")
        };
        if (req.body.productType11) {
          products.push("Tinned Food")
        };

        const calculatedAddress = street + " " + streetNo + " " + zipCode + " " + city + " " + country;

        googleMapsClient.geocode({
          address: calculatedAddress
        }, function (err, response) {
          if (!err) {
            const latitude = response.json.results[0].geometry.location.lat;
            const longitude = response.json.results[0].geometry.location.lng;

            const updatedUser = {
              username: username,
              email: email,
              name: name,
              isProducer: isProducer,
              address: {
                street: street,
                streetNo: streetNo,
                zipCode: zipCode,
                city: city,
                country: country,
                latitude: latitude,
                longitude: longitude
              },
              description: description,
              url: url,
              phoneNo: phoneNo,
              products: products
            };
            User.findByIdAndUpdate(req.user._id, updatedUser, (err, updatedUser) => {
              if (err) {
                next(err);
              }
              return res.redirect('/');
            });
          }
        });
      } else {
        const updatedUser = {
          username: username,
          email: email,
          name: name,
          password: hashPass,
          isProducer: isProducer
        };
        User.findByIdAndUpdate(req.user._id, updatedUser, (err, updatedUser) => {
          if (err) {
            next(err);
          }
          return res.redirect('/');
        });
      }
});

module.exports = router;
