const express = require('express');
const router = express.Router();
const TYPES = require('../models/product-types');

router.get('/', function(req, res, next) {
  res.render('index', { TYPES });
});

module.exports = router;
