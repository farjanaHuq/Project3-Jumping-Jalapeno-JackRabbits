import React, { Component } from "react";
import NavbarComponent from '../components/Navbar';
import Jumbotron from '../components/Jumbotron';
import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';
// import axios from "axios";

class Search extends Component {
   constructor(props) {
      super(props);
      this.state = {
         userData: null
      };
   }

   componentDidMount() {
      // grab the token from local storage and set the user's data to state
      const token = localStorage.getItem('token');
      // console.log('token:', token);
      if (token) var tokenData = JSON.parse(window.atob(token.split('.')[1]));
      // console.log('token data:', tokenData);
      this.setState({
         userData: tokenData
      });
   }

   handleLoginData = () => {
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
               page={'Search'}
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

export default Search;
