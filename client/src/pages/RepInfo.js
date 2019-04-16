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
import combinedIndustries from '../combined-industries';
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
         topTenIndustries: [],
         combinedIndustries: combinedIndustries,
         recentBillsBySubject: []
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

   getTopTenIndustries = () => {
      const topTenIndustries = [];
      this.state.repIndustries.forEach(elem => {
         topTenIndustries.push(elem["@attributes"].industry_name);
      });
      return topTenIndustries;
   }

   selectIndustry = (event) => {
      event.preventDefault();
      // save the clicked opensecrets industry and its corresponding propublica subjects to constants
      const opensecretsIndustry = event.target.textContent;
      const propublicaSubjects = this.state.combinedIndustries[event.target.textContent];
      console.log('opensecretsIndustry:', opensecretsIndustry);
      console.log('propublicaSubjects:', propublicaSubjects);
      const recentBillsBySubject = [];
      // make a counter to tell when the final API request has been finished
      var requestCounter = 0;
      // loop through the propublica subjects, do an API request on each, and push them to an array
      propublicaSubjects.forEach(elem => {
         axios.get('/api/propublica/recent-bills/' + elem)
            .then(resp => {
               recentBillsBySubject.push(resp.data);
               requestCounter++;
               // if the last request has been finished
               if (requestCounter === propublicaSubjects.length) {
                  // grab all the bills from each relevant subject and push them into one array
                  const consolidatedBillsBySubject = [];
                  recentBillsBySubject.forEach(elem => {
                     if (elem[200] === 'OK') {
                        elem.results.forEach(resultsElem => {
                           consolidatedBillsBySubject.push(resultsElem);
                        })
                     }
                  });
                  this.setState({ recentBillsBySubject: consolidatedBillsBySubject });
                  console.log('consolidated bills by subject:', this.state.recentBillsBySubject);
                  // push the bills in both the recent bills by subjects array and recent votes by member array to a new array
                  const recentRepVotesBySubject = [];
                  this.state.specificMemberVotes.data.results[0].votes.forEach(elem => {
                     const i = this.state.recentBillsBySubject.findIndex(item => item.bill_id === elem.bill.bill_id);
                     if (i !== -1) recentRepVotesBySubject.push(elem);
                  });
                  console.log('recentRepVotesBySubject:', recentRepVotesBySubject);
                  // const arr1 = [{name: 'jim'}, {name: 'bo'}];
                  // const arr2 = [{name: 'scrimbo'}, {name: 'bo'}];
                  // const recentRepVotesBySubject = [];
                  // arr1.forEach(elem => {
                  //    const i = arr2.findIndex(item => item.name === elem.name);
                  //    if (i !== -1) recentRepVotesBySubject.push(elem);
                  // });
                  // console.log('recentRepVotesBySubject:', recentRepVotesBySubject);
               }
            })
            .catch(err => console.log(err));
      });
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
      const tokenStr = localStorage.getItem("token");
      axios.put(`/api/secureCommentAndRatingRoutes/raterepresentative/${repCid}/${voteType}/${userID}`,
         {},
         {
            headers: { "Authorization": `Bearer ${tokenStr}` }
         })
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
      const tokenStr = localStorage.getItem("token");
      const commentID = event.target.getAttribute('id').split('-')[1];
      console.log(commentID);
      const userID = this.state.userData.userID;
      const voteType = event.target.getAttribute('id').split('-')[0];
      console.log('userID:', userID);
      console.log('votetype:', voteType);
      axios.put(`/api/secureCommentAndRatingRoutes/ratecomment/${commentID}/${voteType}/${userID}`,
         {},
         {
            headers: { "Authorization": `Bearer ${tokenStr}` }
         }
      )
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
               page={'RepInfo'}
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
                        selectIndustry={this.selectIndustry}
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
                  <Col>
                     <Legislation
                        specificMemberVotes={this.state.specificMemberVotes}
                     />
                  </Col>
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