const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const User     = require('./user');
const ProductType     = require('./product-types');
const moment   = require("moment");

const EventSchema = new Schema({
  _creator      : { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title         : { type: String, required: true },
  description   : { type: String, required: true },
  datetime      : { type: Date, default: Date.now },
  address       : {
                  street: String,
                  streetNo: Number,
                  zipCode: String,
                  city: String,
                  country: String,
                  latitude: Number,
                  longitude: Number
                  },
  products      : [ { type: Schema.Types.ObjectId, ref: 'ProductType', required: true } ],
  comments      : [ {
                  type: Schema.Types.ObjectId,
                  ref: 'User',
                  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
                  text: String
                  } ],
  viewsCount    : { type: Number, default: 0 },
  attendantsCount  : { type: Number, default: 0 }
},
{ timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});


module.exports = mongoose.model('Event', EventSchema);
