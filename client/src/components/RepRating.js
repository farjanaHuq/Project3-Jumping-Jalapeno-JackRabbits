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

   calculateRatingPercent = () => {
      if (this.props.repRatingAndComments) {
         var upVotes;
         var downVotes;
         upVotes = this.props.repRatingAndComments.upVotes.length;
         downVotes = this.props.repRatingAndComments.downVotes.length;
         const totalVotes = upVotes + downVotes;
         return Math.round(((upVotes / totalVotes)) * 100) + '%';
      }
   }

   upVoteRep = () => {
      axios.put(`/raterepresentative/:repCid/:voteType`)
   }

   downVoteRep = () => {

   }

   render() {
      return (
         <div className="rep-rating-div">
            <div className="card">
               <div className="card-header">User Rating</div>
               <div className="card-body">
                  <span id="rep-rating">
                     <FontAwesomeIcon icon="thumbs-up" id="upvote-rep" onClick={this.upVoteRep} />
                     &nbsp;&nbsp;{this.calculateRatingPercent()}&nbsp;&nbsp;
                     <FontAwesomeIcon icon="thumbs-down" id="downvote-rep" onClick={this.downVoteRep} />
                  </span>
               </div>
            </div>
         </div>
      );
   }
}

export default RepRating;