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
import Comments from "../components/Comments";
import { Container, Row, Col } from 'reactstrap';

class RepInfo extends Component {
   constructor(props) {
      super(props);
      this.state = {
         userData: {
            userID: ''
         },
         repSummary: {},
         repIndustries: [],
         scrapeSummary: {},
         repRatingAndComments: {
            comments: [
               {
                  upVotes: [],
                  downVotes: [],
                  userDisplayName: ''
               }
            ],
            downVotes: [],
            repCid: '',
            upVotes: [],
            _id: ''
         },
         specificMemberVotes: {
            data: {
               results: [
                  {
                     votes: []
                  }
               ]
            }
         },
         topTenIndustries: []
      };
   }

   componentDidMount() {
      this.handleLoginData();
      // get represntative's cid from url parameter
      const url_string = window.location.href;
      const url = new URL(url_string);
      const cid = url.searchParams.get("cid");
      // console.log(cid);

      // get rep summary
      axios.get('/api/opensecrets/repsummary/' + cid)
         .then(resp => {
            const repSummary = resp.data.response.summary["@attributes"];
            console.log('open secrets summary resp:', resp.data);
            console.log('cand name:', resp.data.response.summary["@attributes"].cand_name)
            this.getRepRatingAndComments(cid, resp.data.response.summary["@attributes"].cand_name);
            return this.setState({ repSummary: repSummary });
         })
         .catch(err => console.log(err));

      // get rep industries
      axios.get('/api/opensecrets/repindustries/' + cid)
         .then(resp => {
            const repIndustries = resp.data.response.industries.industry;
            // console.log('repindustries:', repIndustries);
            this.setState({ repIndustries: repIndustries });
         })
         .catch(err => console.log(err));

      // scrape summary data
      axios.get('/api/opensecrets/scrapesummary/' + cid)
         .then(resp => {
            const scrapeSummary = resp.data;
            // console.log('scrapesummary data:', scrapeSummary);
            this.setState({ scrapeSummary: scrapeSummary });
         })
         .catch(err => console.log(err));
      ;

   }

   handleLoginData = () => {
      // grab the token from local storage and set the user's data to state
      const token = localStorage.getItem('token');
      // console.log('token:', token);
      if (token) var tokenData = JSON.parse(window.atob(token.split('.')[1]));
      console.log('user data:', tokenData);
      this.setState({
         userData: tokenData
      });
   }

   handleLogout = () => {
      localStorage.removeItem('token');
      this.setState({ userData: null });
   }

   // =============================================== legislation =============================================== //

   getCongressMembers = chamberLetter => {
      // get which chamber the congressmember is from
      // console.log('chamberLetter:', chamberLetter)
      var chamber;
      if (chamberLetter === 'H') {
         chamber = 'house';
      } else if (chamberLetter === 'S') {
         chamber = 'senate';
      }
      // console.log('chamber:', chamber)
      // find all members of that chamber on propublica api to get their propublica ID#
      axios.get(`/api/propublica/all-members/${chamber}`)
         .then(resp => {
            // console.log('congress members:', resp);
            // if statement prevents infinite setstate/re-render loop
            if (!this.state.allCongressMembers) {
               // set congressmember data to state
               this.setState({ allCongressMembers: resp.data });
               // console.log('this.state.allCongressMembers:', this.state.allCongressMembers);
               // find the index in propublica data w/ the congressmember's name
               const i = this.state.allCongressMembers.findIndex(
                  (elem => elem.first_name === this.splitCandName(this.state.repSummary.cand_name)[1]) &&
                  (elem => elem.last_name === this.splitCandName(this.state.repSummary.cand_name)[0])
               );
               // console.log('i:', i);
               // save their propublica id to a const
               const memberID = this.state.allCongressMembers[i].memberId;
               // get the recent votes of the congressmember from propublica
               axios.get('api/propublica/specific-member/' + memberID)
                  .then(resp => {
                     // console.log('votes by specific member data:', resp);
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

   splitCandName = candName => {
      return candName.split(', ');
   }

   // getIndustryData = industry => {
   //    axios.get('api/propublica/recent-Bills/' + industry)
   //       .then(resp => { })
   //       .catch(err => console.log(err));
   //    ;
   // }

   getTopTenIndustries = () => {
      const topTenIndustries = [];
      this.state.repIndustries.forEach(elem => {
         topTenIndustries.push(elem["@attributes"].industry_name);
      });
      return topTenIndustries;
   }

   // ======================================= rep rating and comments ========================================= //

   getRepRatingAndComments = (repCid, repName) => {
      // get the representative's comments and ratings
      axios.get(`/api/commentAndRating/representative/${repCid}/${repName}`)
         .then(resp => {
            this.setState({ repRatingAndComments: resp.data });
         })
         .catch(err => console.log(err));
      ;
   }

   calculateRatingPercent = () => {
      if (this.state.repRatingAndComments) {
         const upVotes = this.state.repRatingAndComments.upVotes.length;
         const downVotes = this.state.repRatingAndComments.downVotes.length;
         const totalVotes = upVotes + downVotes;
         const approvalRating = Math.round(((upVotes / totalVotes)) * 100);
         if (approvalRating) {
            return approvalRating + '%';
         } else {
            return '0%';
         }
      }
   }

   upVoteRep = () => {
      this.rateRep('upvote');
   }

   downVoteRep = () => {
      this.rateRep('downvote');
   }

   rateRep = voteType => {
      const repCid = this.state.repRatingAndComments.repCid;
      const userID = this.state.userData.userID;
      axios.put(`/api/secureCommentAndRatingRoutes/raterepresentative/${repCid}/${voteType}/${userID}`)
         .then(resp => {
            console.log('rate rep resp:', resp);
            this.getRepRatingAndComments(repCid);
         })
         .catch(err => (console.log('up vote rep err:', err)));
   }

   upVoteComment = (event) => {
      this.rateComment(event, 'upvote');
   }

   downVoteComment = (event) => {
      this.rateComment(event, 'downvote');
   }

   rateComment = (event) => {
      const commentID = event.target.getAttribute('id').split('-')[1];
      console.log(commentID);
      const userID = this.state.userData.userID;
      const voteType = event.target.getAttribute('id').split('-')[0];
      console.log('userID:', userID);
      console.log('votetype:', voteType);
      axios.put(`/api/secureCommentAndRatingRoutes/ratecomment/${commentID}/${voteType}/${userID}`)
         .then(resp => {
            console.log('rate comment resp:', resp);
            this.getRepRatingAndComments(this.state.repRatingAndComments.repCid);
         })
         .catch(err => (console.log('up vote rep err:', err)));
   }

   logRepRatingState = () => {
      if (this.state.userData && this.state.repRatingAndComments) {
         console.log('rep info state:', this.state);
      }
   }


   // ================================================= render ================================================= //

   render() {
      this.getCongressMembers(this.state.repSummary.chamber);
      console.log('rep industry data:', this.state.repIndustries);
      console.log('top ten industries:', this.getTopTenIndustries());

      return (
         <div>
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
                  <Col md={{ size: 6, offset: 3 }}
                     className="generalInfoCol d-flex align-items-center flex-column">
                     <RepGeneralInfo
                        repSummary={this.state.repSummary}
                        scrapeSummary={this.state.scrapeSummary}
                     />
                  </Col>
                  <Col md="3" className="d-flex flex-column justify-content-center">
                     <RepRating
                        userData={this.state.userData}
                        repRatingAndComments={this.state.repRatingAndComments}
                        calculateRatingPercent={this.calculateRatingPercent}
                        upVoteRep={this.upVoteRep}
                        downVoteRep={this.downVoteRep}
                        rateRep={this.rateRep}
                        logRepRatingState={this.logRepRatingState}
                        handleRepRatingIconColors={this.handleRepRatingIconColors}
                     />
                  </Col>
               </Row>

               <Row>
                  <Col md="6">
                     <IndustryFunds
                        repIndustries={this.state.repIndustries}
                     // getIndustryData={this.getIndustryData}
                     />
                  </Col>

                  <Col md="6">
                     <SourceOfFunds
                        scrapeSummary={this.state.scrapeSummary}
                     />
                  </Col>
               </Row>

               <Row>
                  <Legislation
                     specificMemberVotes={this.state.specificMemberVotes}
                  />
               </Row>

               <Row>
                  <Col>
                     <Comments
                        userData={this.state.userData}
                        repRatingAndComments={this.state.repRatingAndComments}
                        getRepRatingAndComments={this.getRepRatingAndComments}
                        upVoteComment={this.upVoteComment}
                        downVoteComment={this.downVoteComment}
                        rateComment={this.rateComment}
                     />
                  </Col>
               </Row>

            </Container>
         </div>
      );
   }
}

export default RepInfo;