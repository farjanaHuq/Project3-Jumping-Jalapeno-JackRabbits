import React, { Component } from "react";
import NavbarComponent from '../components/Navbar';
import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';
import USStatesForm from '../components/USStatesForm';
import RepresentativesForm from '../components/RepresentativesForm';
import axios from 'axios';

class Representatives extends Component {
   constructor(props) {
      super(props);
      this.state = {
         userData: { date: '', displayName: '', email: '', userID: '' },
         representatives: [],
         repsLoaded: false
      };
   }

   componentDidMount() {
      this.handleLoginData();
      this.repsByStateRequest('AL');
   }

   handleStateSubmit = event => {
      event.preventDefault();
      const selectedState = document.getElementById('USStateSelect').value;
      this.repsByStateRequest(selectedState);
   }

   repsByStateRequest = selectedState => {
      this.setState({ repsLoaded: false });
      axios.get('/api/opensecrets/repsbystate/' + selectedState)
         .then(resp => {
            // console.log('legislators:', resp.data.response.legislator);
            this.setState({
               representatives: resp.data.response.legislator,
               repsLoaded: true
            });
            // console.log('reps by state:', this.state.representatives);
         })
         .catch(err => {
            console.log(err);
         });
   }

   handleRepSubmit = event => {
      event.preventDefault();

   }

   handleLoginData = () => {
      // grab the token from local storage and set the user's data to state
      const token = localStorage.getItem('token');
      if (token) var tokenData = JSON.parse(window.atob(token.split('.')[1]));
      this.setState({
         userData: tokenData
      });
   }

   handleLogout = () => {
      localStorage.removeItem('token');
      this.setState({ userData: { date: '', displayName: '', email: '', userID: '' } });
   }

   render() {
      return (
         <div>
            <NavbarComponent
               page={'Representatives'}
               userData={this.state.userData}
               handleLoginData={this.handleLoginData}
               handleLogout={this.handleLogout}
            />
            <div className="container">
               <USStatesForm
                  handleStateSubmit={this.handleStateSubmit}
               />
               <RepresentativesForm
                  repsLoaded={this.state.repsLoaded}
                  representatives={this.state.representatives}
               />
            </div>
            <LoginModal />
            <SignupModal />
         </div>
      );
   }
}

export default Representatives;