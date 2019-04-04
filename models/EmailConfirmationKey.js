const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emailConfirmationKeySchema = new Schema({
   userId: {
      type: String
   },
   key: {
      type: String
   }
});

const EmailConfirmationKey = mongoose.model('EmailConfirmationKey', emailConfirmationKeySchema);

module.exports = EmailConfirmationKey;