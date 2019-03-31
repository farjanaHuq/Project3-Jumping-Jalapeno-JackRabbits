const express = require('express');
const router = express.Router();
const models = require('../models');
const crypto = require('crypto');
const helpers = require('./helpers/authHelpers');


// register
router.post('/register', (req, res) => {
   if (!req.body.displayName || !req.body.password || !req.body.email) {
      return res.status(400).json({ msg: new Error('Please put all data on body.') });
   }
   const user = {
      displayName: req.body.displayName,
      email: req.body.email,
      date: req.body.date,
      salt: helpers.getSalt()
   }
   user.hash = helpers.getHash(user.salt, req.body.password);
   models.User.create(user)
      .then(resp => res.status(201).json({ msg: 'User Created' }))
      .catch(err => res.status(400).json({ msg: err.toString() }));
});

// login
router.post('/login', (req, res) => {

});

module.exports = router;