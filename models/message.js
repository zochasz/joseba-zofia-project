const mongoose = require('mongoose');
const User     = require('./user');
const Schema   = mongoose.Schema;

const MessageSchema = new Schema({
  title      : { type: String, required: true },
  text       : { type: String, required: true },
  _from      : { type: Schema.Types.ObjectId, ref: 'User' },
  _to        : { type: Schema.Types.ObjectId, ref: 'User' },
  timestamps : { createdAt: "created_at" },
});


const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
