const express = require('express');
const router = express.Router();
const db = require('../models');

// get a rep's rating and comments
router.get('/representative/:repCid', (req, res) => {
   // search the database to see if an index for this representative has already been created
   db.Representative.findOne(
      { repCid: req.params.repCid })
      .populate("comments")
      .then(data => {
         // if it hasn't been created yet, create it now
         if (!data) {
            return db.Representative.create({
               repCid: req.params.repCid,
               repName: req.body.repName
            })
               .then(createdData => res.json(createdData));
            ;
         } else {
            res.json(data);
         }
      })
      .catch(function (err) {
         res.json(err);
      });
   ;
});

module.exports = router;

