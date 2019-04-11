import React, { Component } from "react";
import NavbarComponent from '../components/Navbar';
import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';
import axios from "axios";
import RepGeneralInfo from "../components/RepGeneralInfo";
import RepRating from "../components/RepRating";
import SourceOfFunds from "../components/SourceOfFunds";
import IndustryFunds from "../components/IndustryFunds";
import Legislation from "../components/Legislation";
import { Container, Row, Col } from 'reactstrap';

class RepInfo extends Component {
   constructor(props) {
      super(props);
      this.state = {
         userData: null,
         repSummary: {},
         repIndustries: {},
         scrapeSummary: {}
      };
   }

   componentDidMount() {
      this.handleLoginData();
      // get represntative's cid from url parameter
      const url_string = window.location.href;
      const url = new URL(url_string);
      const cid = url.searchParams.get("cid");
      console.log(cid);

      // get rep summary
      axios.get('/api/opensecrets/repsummary/' + cid)
         .then(resp => {
            const repSummary = resp.data.response.summary["@attributes"];
            console.log('repsummary:', repSummary);
            this.setState({ repSummary: repSummary });
         })
         .catch(err => {
            console.log(err);
         });

      // get rep industries
      axios.get('/api/opensecrets/repindustries/' + cid)
         .then(resp => {
            const repIndustries = resp.data.response.industries.industry;
            console.log('repindustries:', repIndustries);
            this.setState({ repIndustries: repIndustries });
         })
         .catch(err => {
            console.log(err);
         });

      // scrape summary data
      axios.get('/api/opensecrets/scrapesummary/' + cid)
         .then(resp => {
            const scrapeSummary = resp.data;
            console.log('scrapesummary data:', scrapeSummary);
            this.setState({ scrapeSummary: scrapeSummary });
         })
         .catch(err => {
            console.log(err);
         });
      ;

      // get the representative's comments and ratings
      axios.get('/api/commentAndRating/representative/' + cid)
         .then(resp => {
            console.log("rep rating & comments:\n", resp.data);
            this.setState({ repRatingAndComments: resp.data });

         })
         .catch(err => console.log(err));
      ;

   }

   getCongressMembers = chamberLetter => {
      // get which chamber the congressmember is from
      console.log('chamberLetter:', chamberLetter)
      if (chamberLetter === 'H') {
         var chamber = 'house';
      } else if (chamberLetter === 'S') {
         var chamber = 'senate';
      }
      console.log('chamber:', chamber)
      // find all members of that chamber on propublica api to get their propublica ID#
      axios.get(`/api/propublica/all-members/${chamber}`)
         .then(resp => {
            console.log('congress members:', resp);
            // if statement prevents infinite setstate/re-render loop
            if (!this.state.allCongressMembers) {
               // set congressmember data to state
               this.setState({ allCongressMembers: resp.data });
               console.log('this.state.allCongressMembers:', this.state.allCongressMembers);
               // find the index in propublica data w/ the congressmember's name
               const i = this.state.allCongressMembers.findIndex(
                  (elem => elem.first_name === this.splitCandName(this.state.repSummary.cand_name)[1]) &&
                  (elem => elem.last_name === this.splitCandName(this.state.repSummary.cand_name)[0])
               );
               console.log('i:', i);
               // save their propublica id to a const
               const memberID = this.state.allCongressMembers[i].memberId;
               // get the recent votes of the congressmember from propublica
               axios.get('api/propublica/specific-member/' + memberID)
                  .then(resp => {
                     console.log('votes by specific member data:', resp);
                     this.setState({ specificMemberVotes: resp });
                  })
                  .catch(err => {
                     console.log(err);
                  });
               ;
            }
         })
         .catch(err => {
            console.log(err);
         });
      ;
   }

   handleLoginData = () => {
      // grab the token from local storage and set the user's data to state
      const token = localStorage.getItem('token');
      // console.log('token:', token);
      if (token) var tokenData = JSON.parse(window.atob(token.split('.')[1]));
      // console.log('token data:', tokenData);
      this.setState({
         userData: tokenData
      });
   }

   handleLogout = () => {
      localStorage.removeItem('token');
      this.setState({ userData: null });
   }

   splitCandName = candName => {
      return candName.split(', ');
   }

   getIndustryData = industry => {
      axios.get('api/propublica/recent-Bills/' + industry)
         .then(resp => {
            console.log('bills of specific industry:', resp);
         })
         .catch(err => {
            console.log(err);
         });
      ;
   }

   render() {
      return (
         <div>
            {this.getCongressMembers(this.state.repSummary.chamber)}
            {console.log('this.state.repSummary.chamber:', this.state.repSummary.chamber)}
            {console.log('repSummary:', this.state.repSummary)}
            {console.log('repIndustries:', this.state.repIndustries)}
            {console.log('scrapeSummary:', this.state.scrapeSummary)}
            {console.log('rep rating state:', this.state.repRatingAndComments ? this.state.repRatingAndComments.upVotesNum : this.state.repRatingAndComments)}
            <NavbarComponent
               page={'Home'}
               userData={this.state.userData}
               handleLoginData={this.handleLoginData}
               handleLogout={this.handleLogout}
            />
            <LoginModal />
            <SignupModal />
            <Container>

               <Row>
                  <Col md={{ size: 6, offset: 3 }} className="generalInfoCol d-flex align-items-center flex-column">
                     <RepGeneralInfo
                        repSummary={this.state.repSummary}
                        scrapeSummary={this.state.scrapeSummary}
                     />
                  </Col>
                  <Col md="3">
                     <RepRating
                        repRatingAndComments={this.state.repRatingAndComments}
                     />
                  </Col>
               </Row>

               <Row>

                  <Col md="6">
                     <IndustryFunds
                        repIndustries={this.state.repIndustries}
                        getIndustryData={this.getIndustryData}
                     />
                     <SourceOfFunds
                        scrapeSummary={this.state.scrapeSummary}
                     />
                  </Col>

                  <Col md="6">
                     <Legislation
                        specificMemberVotes={this.state.specificMemberVotes}
                     />
                  </Col>

               </Row>

            </Container>
         </div>
      );
   }
}

export default RepInfo;