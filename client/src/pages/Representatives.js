import React, { Component } from "react";
import NavbarComponent from '../components/Navbar';
import Jumbotron from '../components/Jumbotron';
import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';
import USStatesForm from '../components/USStatesForm';
import axios from 'axios';
// import axios from "axios";

class Representatives extends Component {
   constructor(props) {
      super(props);
      this.state = {
         userData: null
      };
   }

   componentDidMount() {
      this.handleLoginData();
      this.openSecretsGetRepsByState();
   }

   openSecretsGetRepsByState = () => {
      const USStateParam = 'CA';
      axios.get('/api/opensecrets/repsbystate/' + USStateParam, {
      })
         .then(res => {
            console.log('reps by state:', res.data);
         })
         .catch(err => {
            console.log(err);
         });
      ;
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
      this.setState({ userData: null });
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
            <Jumbotron />
            <USStatesForm />
            <LoginModal />
            <SignupModal />
         </div>
      );
   }
}

export default Representatives;