const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emailValidationKeySchema = new Schema({
   userID: { type: String },
   validationKey: { type: String }
});

const EmailValidationKey = mongoose.model('EmailValidationKey', emailValidationKeySchema);

module.exports = EmailValidationKey;