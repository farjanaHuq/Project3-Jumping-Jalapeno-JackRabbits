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

   calculateRatingPercent = () => {
      var upVotes;
      var downVotes;
      if (this.props.repRatingAndComments) upVotes = this.props.repRatingAndComments.upVotesNum;
      if (this.props.repRatingAndComments) downVotes = this.props.repRatingAndComments.downVotesNum;
      return ((upVotes / (upVotes + downVotes)) * 100) + '%';
   }


   render() {
      return (
         <div>
            {/* {console.log('rep rating and comments:', this.props.repRatingAndComments)} */}
            {console.log(this.calculateRatingPercent())}
            <span><FontAwesomeIcon icon="thumbs-up" /> {this.calculateRatingPercent()} <FontAwesomeIcon icon="thumbs-down" /></span>

         </div>
      );
   }
}

export default RepRating;