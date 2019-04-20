var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var votePositionSchema = new Schema({
   memberID: { type: String },
   billID: { type: String },
   billNumber: { type: String },
   description: { type: String },
   date: { type: String },
   time: { type: String },
   question: { type: String },
   position: { type: String },
   result: { type: String },
   totalYes: { type: String },
   totalNo: { type: String },
   totalPresent: { type: String },
   totalNotVoting: { type: String },
   latestAction: { type: String },
   title: { type: String }
});

var VotePosition = mongoose.model("VotePosition", votePositionSchema);

module.exports = VotePosition;