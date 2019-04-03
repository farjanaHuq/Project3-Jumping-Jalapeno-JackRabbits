const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/check', (req, res) => {
   res.json('protected route');
});


module.exports = router;