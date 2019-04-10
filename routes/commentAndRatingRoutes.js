const express = require('express');
const router = express.Router();
const db = require('../models');

// post a comment
router.post('/comment/', (req, res) => {
   db.Comment.create({
      userID: req.body.userID,
      repCid: req.body.repCid,
      message: req.body.message,
      userEmail: req.body.userEmail,
      userDisplayName: req.body.userDisplayName
   })
      .then(function (data) {
         res.json(data);
      })
      .catch(function (err) {
         res.json(err);
      });
   ;
});

// get all the comments for this rep
router.get("/commentsbyrep/:repCid", (req, res) => {
   db.Comment.find({
      repCid: req.params.repCid
   })
      .then(function (data) {
         res.json(data);
      })
      .catch(function (err) {
         res.json(err);
      });
   ;
});

// upvote/downvote a comment
router.put("/comment/:commentID", (req, res) => {
   // first, get the comment's current rating value
   db.Comment.findById(
      req.params.commentID
   )
      .then(function (data) {
         // add or subtract 1 to/from the rating
         if (req.body.voteType === 'upvote') {
            db.Comment.updateOne({
               _id: req.params.commentID
            }, {
                  $set: { rating: data.rating + 1 }
               })
               .then(function (upvoteData) {
                  console.log(data.rating);
                  res.json(upvoteData);
               });
            ;
         } else if (rep.body.voteType === 'downvote') {
            db.Comment.updateOne({
               _id: req.params.commentID
            }, {
                  $set: { rating: data.rating - 1 }
               })
               .then(function (downvoteData) {
                  res.json(downvoteData);
               });
            ;
         }
      })
      .catch(function (err) {
         res.json(err);
      });
   ;
});

// get a rep's rating and comments
router.get('/representative/:repCid', (req, res) => {
   // search the database to see if an index for this representative has already been created
   db.Representative.findOne({
      repCid: req.params.repCid
   })
      .then(function (data) {
         // if it hasn't been created yet, create it now
         if (!data) {
            db.Representative.create({
               repCid: req.params.repCid
               // add other data here
            })
         }
      })
      .catch(function (err) {
         res.json(err);
      });
   ;
});

module.exports = router;