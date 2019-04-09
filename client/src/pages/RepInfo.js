import React, { Component } from "react";
import NavbarComponent from '../components/Navbar';
import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';
import axios from "axios";
import RepGeneralInfo from "../components/RepGeneralInfo";
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
         scrapeSummary: {},
         legislationData: {}
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


   }

   getCongressMembers = chamberLetter => {
      console.log('chamberLetter:', chamberLetter)
      if (chamberLetter === 'H') {
         var chamber = 'house';
      } else if (chamberLetter === 'S') {
         var chamber = 'senate';
      }
      console.log('chamber:', chamber)
      axios.get(`/api/propublica/all-members/${chamber}`)
         .then(resp => {
            console.log('congress members:', resp);
            this.setState({ legislationData: resp })
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



   render() {
      return (
         <div>
            {this.getCongressMembers(this.state.repSummary.chamber)}
            {console.log('this.state.repSummary.chamber:', this.state.repSummary.chamber)}
            {console.log('repSummary:', this.state.repSummary)}
            {console.log('repIndustries:', this.state.repIndustries)}
            {console.log('scrapeSummary:', this.state.scrapeSummary)}
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
                  <Col className="generalInfoCol d-flex align-items-center flex-column">
                     <RepGeneralInfo
                        repSummary={this.state.repSummary}
                        scrapeSummary={this.state.scrapeSummary}
                     />
                  </Col>

               </Row>

               <Row>

                  <Col md="6">
                     <IndustryFunds
                        repIndustries={this.state.repIndustries}
                     />
                     <SourceOfFunds
                        scrapeSummary={this.state.scrapeSummary}
                     />
                  </Col>

                  <Col md="6">
                     <Legislation
                        legislationData={this.state.legislationData}
                     />
                  </Col>

               </Row>




            </Container>
         </div>
      );
   }
}

export default RepInfo;