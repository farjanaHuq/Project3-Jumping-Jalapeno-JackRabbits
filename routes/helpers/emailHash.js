var crypto = require('crypto');

console.log(uString);

const emailHashGenerator = (email) =>{
    var mySecretKey = "lifeIsBeautiful";
    crypto.createHash('sha1').update(`${email}` + mySecretKey).digest('hex');
}

module.exports = emailHashGenerator;