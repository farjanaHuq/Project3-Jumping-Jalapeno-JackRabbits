const express = require('express');
const router = express.Router();
const db = require('../models');

// get all books
router.get('/check', (req, res) => {
   res.json('protected route');
});


module.exports = router;