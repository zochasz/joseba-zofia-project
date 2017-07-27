const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const TYPES    = require('./product-types');
const User     = require('./user');
const moment   = require("moment");

const EventSchema = new Schema({
  _creator      : { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title         : { type: String, required: true },
  description   : { type: String, required: true },
  address       : {
                  street: String,
                  streetNo: Number,
                  zip_code: String,
                  city: String,
                  country: String,
                  latitude: Number,
                  longitude: Number
                  },
  // timestamps    : { createdAt: "created_at", updatedAt: "updated_at" },
  products      : [ { type: String, enum: TYPES, required: true } ],
  comments      : [ {
                  type: Schema.Types.ObjectId,
                  ref: 'User',
                  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
                  text: String
                  } ],
  viewsCount    : { type: Number, default: 0 },
  attendantsCount  : { type: Number, default: 0 },
});


module.exports = mongoose.model('Event', EventSchema);
