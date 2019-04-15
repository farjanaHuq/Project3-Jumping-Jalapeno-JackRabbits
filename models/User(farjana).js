const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-type-email');

const userSchema = new Schema({
   email: {
      type: mongoose.SchemaTypes.Email,
      trim: true,
      lowercase: true,
      unique: true,
      required: true
   },
   displayName: {
      type: String,
      required: true
   },
   salt: {
      type: String
   },
   hash: {
      type: String
   },
   date: {
      type: Date,
      default: Date.now
   },
   emailValidated: {
      type: Boolean,
      default: false
   },
   active: {
      type: Boolean,
      required: true,
      default: false
   },
   temporaryToken: {
      type: String,
      required: true
   }

});

const User = mongoose.model('User', userSchema);

module.exports = User;