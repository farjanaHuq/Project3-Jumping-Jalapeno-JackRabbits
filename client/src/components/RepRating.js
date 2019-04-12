import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../style.css';
import axios from "axios";

class RepRating extends Component {
   constructor(props) {
      super(props);
      this.state = {
      };
   }

   componentDidMount() {

   }

   // calculateRatingPercent = () => {
   //    if (this.props.repRatingAndComments) {
   //       const upVotes = this.props.repRatingAndComments.upVotes.length;
   //       const downVotes = this.props.repRatingAndComments.downVotes.length;
   //       const totalVotes = upVotes + downVotes;
   //       const approvalRating = Math.round(((upVotes / totalVotes)) * 100);
   //       if (approvalRating) {
   //          return approvalRating + '%';
   //       } else {
   //          return '0%';
   //       }
   //    }
   // }

   upVoteRep = () => {
      this.rateRep('upvote');
   }

   downVoteRep = () => {
      this.rateRep('downvote');
   }

   rateRep = voteType => {
      const repCid = this.props.repRatingAndComments.repCid;
      const userID = this.props.userData.userID;
      axios.put(`/api/secureCommentAndRatingRoutes/raterepresentative/${repCid}/${voteType}/${userID}`)
         .then(resp => console.log('up vote resp:', resp))
         .catch(err => (console.log('up vote rep err:', err)));
   }

   logProps = () => {
      if (this.props.userData && this.props.repRatingAndComments) {
         console.log('rep rating props:', this.props);
      }
   }

   renderRepRatingDiv = () => {
      if (this.props.repRatingAndComments && this.props.userData.userID) {
         return (
            <span id="rep-rating">
               <FontAwesomeIcon icon="thumbs-up" id="upvote-rep" onClick={this.props.upVoteRep}
                  style={{ color: this.props.repRatingAndComments.upVotes.includes(this.props.userData.userID) ? 'rgb(0, 107, 207)' : 'white' }}
               />
               &nbsp;&nbsp;{this.props.calculateRatingPercent()}&nbsp;&nbsp;
            <FontAwesomeIcon icon="thumbs-down" id="downvote-rep" onClick={this.props.downVoteRep}
                  style={{ color: this.props.repRatingAndComments.downVotes.includes(this.props.userData.userID) ? 'rgb(0, 107, 207)' : 'white' }}
               />
            </span>
         );
      }
   }

   render() {
      return (
         <div className="rep-rating-div">
            {/* {this.props.handleRepRatingIconColors()} */}
            {this.props.logRepRatingState()}
            <div className="card">
               <div className="card-header">User Rating</div>
               <div className="card-body">
                  {this.renderRepRatingDiv()}
               </div>
            </div>
         </div>
      );
   }
}

export default RepRating;