const express = require('express');
const router = express.Router();
const db = require('../models');

// get a rep's rating and comments
router.get('/representative/:repCid/:repName', (req, res) => {
   console.log('get rep info route hit');
   console.log('repCid:', req.params.repCid);
   console.log('repName:', req.params.repName);
   // search the database to see if an index for this representative has already been created
   db.Representative.findOne(
      { repCid: req.params.repCid })
      .populate("comments")
      .then(data => {
         // if it hasn't been created yet, create it now
         console.log('new rep data:', data);
         if (!data) {
            db.Representative.create({
               repCid: req.params.repCid,
               repName: req.params.repName,
               upVotes: []
            })
               .then(createdData => {
                  console.log('new rep data:', createdData);
                  res.json(createdData);
               });
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

