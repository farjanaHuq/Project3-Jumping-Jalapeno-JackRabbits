const express = require('express');
const router = express.Router();
const db = require('../models');

// post a comment
router.post('/comment/', (req, res) => {
   console.log('backend req.body.repCid:', req.body.repCid)
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
            { repCid: req.body.repCid },
            { $push: { comments: data._id } }
         );
      })
      .then(data => res.json(data))
      .catch(err => res.json(err));
   ;
});

// upvote/downvote a representative
router.put('/raterepresentative/:repCid/:voteType/:userID', (req, res) => {
   if (req.params.voteType === 'upvote') {
      // find the rep who is being rated in the database
      db.Representative.findOne(
         { repCid: req.params.repCid })
         .then(data => {
            // check for the user's ID in the appropriate vote array
            if (data.upVotes.includes(req.params.userID)) {
               // if it's already in there, remove it
               db.Representative.updateOne(
                  { repCid: req.params.repCid },
                  { $pull: { upVotes: req.params.userID } }
               ).then(res.send('Removed userID from upvote array.'));
            } else {

               // if the userID is in the downvote array
               if (data.downVotes.includes(req.params.userID)) {
                  // remove it from downvotes and add it to upvotes
                  db.Representative.updateOne(
                     { repCid: req.params.repCid },
                     {
                        $pull: { downVotes: req.params.userID },
                        $push: { upVotes: req.params.userID }
                     }
                  ).then(res.send('Removed userID from downvote array and added it to upvote array.'));
               } else {
                  // else if it's not in the downvotes array, just add it to upvotes
                  db.Representative.updateOne(
                     { repCid: req.params.repCid },
                     { $push: { upVotes: req.params.userID } }
                  ).then(res.send('Added userID to upvote array.'));
               }
            }
         })
         .catch(err => res.json(err));
      ;

   } else if (req.params.voteType === 'downvote') {
      // find the rep who is being rated in the database
      db.Representative.findOne(
         { repCid: req.params.repCid })
         .then(data => {
            // check for the user's ID in the appropriate vote array
            if (data.downVotes.includes(req.params.userID)) {
               // if it's already in there, remove it
               db.Representative.updateOne(
                  { repCid: req.params.repCid },
                  { $pull: { downVotes: req.params.userID } }
               ).then(res.send('Removed userID from downvote array.'));
            } else {

               // if the userID is in the upvote array
               if (data.upVotes.includes(req.params.userID)) {
                  // remove it from upvotes and add it to downvotes
                  db.Representative.updateOne(
                     { repCid: req.params.repCid },
                     {
                        $pull: { upVotes: req.params.userID },
                        $push: { downVotes: req.params.userID }
                     }
                  ).then(res.send('Removed userID from upvote array and added it to downvote array.'));
               } else {
                  // else if it's not in the upvotes array, just add it to downvotes
                  db.Representative.updateOne(
                     { repCid: req.params.repCid },
                     { $push: { downVotes: req.params.userID } }
                  ).then(res.send('Added userID to downvote array.'));
               }
            }
         })
         .catch(err => res.json(err));
      ;
   };
});

// upvote/downvote a comment
router.put("/ratecomment/:commentID/:voteType/:userID", (req, res) => {
   if (req.params.voteType === 'upvote') {
      // find the rep who is being rated in the database
      db.Comment.findOne(
         { _id: req.params.commentID })
         .then(data => {
            // check for the user's ID in the appropriate vote array
            if (data.upVotes.includes(req.params.userID)) {
               // if it's already in there, remove it
               db.Comment.updateOne(
                  { _id: req.params.commentID },
                  { $pull: { upVotes: req.params.userID } }
               ).then(res.send('Removed userID from upvote array.'));
            } else {

               // if the userID is in the downvote array
               if (data.downVotes.includes(req.params.userID)) {
                  // remove it from downvotes and add it to upvotes
                  db.Comment.updateOne(
                     { _id: req.params.commentID },
                     {
                        $pull: { downVotes: req.params.userID },
                        $push: { upVotes: req.params.userID }
                     }
                  ).then(res.send('Removed userID from downvote array and added it to upvote array.'));
               } else {
                  // else if it's not in the downvotes array, just add it to upvotes
                  db.Comment.updateOne(
                     { _id: req.params.commentID },
                     { $push: { upVotes: req.params.userID } }
                  ).then(res.send('Added userID to upvote array.'));
               }
            }
         })
         .catch(err => res.json(err));
      ;

   } else if (req.params.voteType === 'downvote') {
      // find the rep who is being rated in the database
      db.Comment.findOne(
         { _id: req.params.commentID })
         .then(data => {
            // check for the user's ID in the appropriate vote array
            if (data.downVotes.includes(req.params.userID)) {
               // if it's already in there, remove it
               db.Comment.updateOne(
                  { _id: req.params.commentID },
                  { $pull: { downVotes: req.params.userID } }
               ).then(res.send('Removed userID from downvote array.'));
            } else {

               // if the userID is in the upvote array
               if (data.upVotes.includes(req.params.userID)) {
                  // remove it from upvotes and add it to downvotes
                  db.Comment.updateOne(
                     { _id: req.params.commentID },
                     {
                        $pull: { upVotes: req.params.userID },
                        $push: { downVotes: req.params.userID }
                     }
                  ).then(res.send('Removed userID from upvote array and added it to downvote array.'));
               } else {
                  // else if it's not in the upvotes array, just add it to downvotes
                  db.Comment.updateOne(
                     { _id: req.params.commentID  },
                     { $push: { downVotes: req.params.userID } }
                  ).then(res.send('Added userID to downvote array.'));
               }
            }
         })
         .catch(err => res.json(err));
      ;
   };
});

module.exports = router;

