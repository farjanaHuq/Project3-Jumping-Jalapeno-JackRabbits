const express = require('express');
const router = express.Router();
const db = require('../models');


router.post("/emailConfirmKey", function (req, res) {
    db.User.create({
        UserId: req.body.UserId,
        Key: req.body.emailConfirmKey,
    })
       .then(function (dbData) {
          res.json(dbData);
          console.log('dbData', dbData); 
       })
       .catch(function (err) {
          console.log(err);
          throw err;
       });
    ;
 })
module.exports = router;