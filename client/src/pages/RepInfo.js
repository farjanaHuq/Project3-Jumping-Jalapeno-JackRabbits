import React, { Component } from "react";
import NavbarComponent from '../components/Navbar';
import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';
import axios from "axios";

class RepInfo extends Component {
   constructor(props) {
      super(props);
      this.state = {
         userData: null
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
            console.log('repsummary:', resp.data.response.summary["@attributes"]);
         })
         .catch(err => {
            console.log(err);
         });

      // get rep industries
      axios.get('/api/opensecrets/repindustries/' + cid)
         .then(resp => {
            console.log('repindustries:', resp.data.response.industries.industry);
         })
         .catch(err => {
            console.log(err);
         });
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
            <LoginModal />
            <SignupModal />
         </div>
      );
   }
}

export default RepInfo;