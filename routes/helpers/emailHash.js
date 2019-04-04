var crypto = require('crypto');

var mySecretKey = "lifeIsBeautiful";
var uString = crypto.createHash('sha1').update('mannu1200@gmail.com' + mySecretKey).digest('hex');

console.log(uString);