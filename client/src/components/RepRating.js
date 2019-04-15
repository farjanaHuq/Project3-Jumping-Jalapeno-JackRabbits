import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../style.css';

class RepRating extends Component {
   constructor(props) {
      super(props);
      this.state = {
      };
   }

   componentDidMount() {

   }

   renderRepRatingDiv = () => {
      if (this.props.repRatingAndComments && this.props.userData) {
         return (
            <span id="rep-rating">
            {/* {console.log(this.props.repRatingAndComments.upVotes)} */}
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