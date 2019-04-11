import React, { Component } from "react";
import NavbarComponent from '../components/Navbar';
import Jumbotron from '../components/Jumbotron';
import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal(Farjana)';
import axios from "axios";

class Home extends Component {
   constructor(props) {
      super(props);
      this.state = {
         userData: null
      };
   }

   openSecretsApiTest = () => {
      const APIkey = '3d1183f69d960536bde5c2cd99db30a3';
      // getlegistlators: http://www.opensecrets.org/api/?method=getLegislators&id=NJ&output=json&apikey=
      // specificlegislator: http://www.opensecrets.org/api/?method=candSummary&cid=N00026427&cycle=2018&output=json&apikey=
      // console.log('process.env:\n', process.env);
      // console.log(process.env.REACT_APP_SECRET_CODE);
      axios.get('http://www.opensecrets.org/api/?method=candSummary&cid=N00026427&cycle=2018&output=json&apikey=' + APIkey)
         .then(resp => {
            // console.log('resp:', resp);
         })
   }

   componentDidMount() {
      this.handleLoginData();
      this.openSecretsApiTest();
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
            <NavbarComponent
               page={'Home'}
               userData={this.state.userData}
               handleLoginData={this.handleLoginData}
               handleLogout={this.handleLogout}
            />
            <Jumbotron />
            <LoginModal />
            <SignupModal />
         </div>
      );
   }
}

export default Home;