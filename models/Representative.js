var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var representativeSchema = new Schema({
   repCid: {
      type: String
   },
   repName: {
      type: String
   },
   upVotes: [
      { type: String }
   ],
   downVotes: [
      { type: String }
   ],
   comments: [
      {
         type: Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

var Representative = mongoose.model("Representative", representativeSchema);

module.exports = Representative;