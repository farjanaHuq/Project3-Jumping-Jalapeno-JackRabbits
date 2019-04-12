const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
   userEmail: {
      type: String
   },
   userDisplayName: {
      type: String
   },
   userID: {
      type: String
   },
   message: {
      type: String
   },
   upVotes: [
      { type: String }
   ],
   downVotes: [
      { type: String }
   ],
   repCid: {
      type: String
   },
   date: {
      type: Date,
      default: Date.now
   }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;