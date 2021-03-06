const mongoose      = require("mongoose");
const Schema        = mongoose.Schema;
const moment        = require("moment");
const ProductType   = require('./product-types');

const UserSchema  = new Schema({
  username        : { type: String, required: true, unique: true },
  password        : { type: String, required: true },
  name            : { type: String, required: true },
  email           : { type: String, required: true, unique: true },
  _favourites     : [ { type: Schema.Types.ObjectId, ref: 'User' } ],
  _events         : [ { type: Schema.Types.ObjectId, ref: 'Event' } ],
  isProducer      : { type: Boolean, default: false },
  address         : {
                    street: String,
                    streetNo: Number,
                    zipCode: String,
                    city: String,
                    country: String,
                    latitude: Number,
                    longitude: Number
                    },
  description     : String,
  url             : String,
  phoneNo         : String,
  imgurl          : String,
  products      : [ { type: Schema.Types.ObjectId, ref: 'ProductType', required: true } ],
  rate            : [ {
                    _id: { type: Schema.Types.ObjectId, ref: 'User' },
                    stars: Number
                  } ],
  comments        : [ {
                      type: Schema.Types.ObjectId,
                      ref: 'User',
                      timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
                      text: String
                    } ]
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;

// future:
// *** searches (array of  {product types, address})
