import React, { Component } from "react";
import '../style.css';

class RepGeneralInfo extends Component {
   constructor(props) {
      super(props);
      this.state = {
      };
   }

   componentDidMount() {

   }

   renderChamber = () => {
      if (this.props.repSummary.chamber === 'H') {
         return <h4>Representative ({this.props.repSummary.party} - {this.props.repSummary.state})</h4>
      } else {
         return <h4>Senator ({this.props.repSummary.party} - {this.props.repSummary.state})</h4>
      }
   }


   render() {
      return (
         <div className="generalInfoDiv d-flex flex-column align-items-center">
            {/* <FontAwesomeIcon icon="thumbs-up" />
            <FontAwesomeIcon icon="thumbs-down" /> */}
            <div className="headshotHolder">
               <img
                  className="repHeadshot"
                  src={this.props.scrapeSummary.headshot}
                  alt="Rep Headshot"
               />
            </div>
            <h2>{this.props.repSummary.cand_name}</h2>
            {this.renderChamber()}
            <h5>First elected: <span className="generalInfoYear">{this.props.repSummary.first_elected}</span></h5>
            <h5>Next election: <span className="generalInfoYear">{this.props.repSummary.next_election}</span></h5>
         </div>
      );
   }
}

export default RepGeneralInfo;