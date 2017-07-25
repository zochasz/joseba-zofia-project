const mongoose    = require("mongoose");
const Schema      = mongoose.Schema;
const TYPES       = require('./product-types');
const moment      = require("moment");

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
                    latitude: String,
                    longitude: String
                    },
  description     : String,
  url             : String,
  phoneNo         : String,
  imgurl          : String,
  products        : [ { type: String, enum: TYPES, required: true } ],
  rate            : Number,
  comments        : [ {
                      type: Schema.Types.ObjectId,
                      ref: 'User',
                      timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
                      text: String
                    } ]
});

const User = mongoose.model("User", UserSchema);
module.exports = User;

// future:
// *** searches (array of  {product types, address})
