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
         console.log('data id:', data._id);
         return db.Representative.update(
            {
               repCid: req.body.repCid
            },
            {
               $push: { comments: data._id }
            });
         ;
      })
      .then(function (data) {
         res.json(data);
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
      .populate("comments")
      .then(function (data) {
         // if it hasn't been created yet, create it now
         if (!data) {
            db.Representative.create({
               repCid: req.params.repCid,
               repName: req.body.repName
            })
               .then(createdData => {
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

// upvote/downvote a representative
router.put('/representative/:repCid/:voteType', (req, res) => {
   if (req.params.voteType === 'upvote') {
      db.Representative.updateOne(
         { repCid: req.params.repCid },
         { $inc: { upVotesNum: 1 } }
      )
         .then(data => res.json(data))
         .catch(err => res.json(err));
      ;
   } else if (req.params.voteType === 'downvote') {
      db.Representative.updateOne(
         { repCid: req.params.repCid },
         { $inc: { downVotesNum: 1 } }
      )
         .then(data => res.json(data))
         .catch(err => res.json(err));
      ;
   };
});

// upvote/downvote a comment
router.put("/comment/:commentID/:voteType", (req, res) => {
   if (req.params.voteType === 'upvote') {
      db.Comment.updateOne(
         { _id: req.params.commentID },
         { $inc: { rating: 1 } }
      )
         .then(data => res.json(data))
         .catch(err => res.json(err));
      ;
   } else if (req.params.voteType === 'downvote') {
      db.Comment.updateOne(
         { _id: req.params.commentID },
         { $inc: { rating: -1 } }
      )
         .then(data => res.json(data))
         .catch(err => res.json(err));
      ;
   }
});

module.exports = router;