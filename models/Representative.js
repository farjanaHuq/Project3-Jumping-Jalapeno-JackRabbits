var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var representativeSchema = new Schema({
   repCid: {
      type: String
   },
   repName: {
      type: String
   },
   upVotesNum: {
      type: Number,
      default: 0
   },
   downVotesNum: {
      type: Number,
      default: 0
   },
   comments: [
      {
         type: Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

var Representative = mongoose.model("Representative", representativeSchema);

module.exports = Representative;