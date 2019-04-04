const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-type-email');

const emailConfirmKeySchema = new Schema({
  
   userId : {
      type: String
   },
   key: {
      type: String
   }
   
});

const EmailConfirmKey = mongoose.model('EmailConfirmKey', emailConfirmKeySchema);

module.exports = EmailConfirmKey;