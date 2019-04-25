import React, { Component } from "react";
import '../style.css';
import { Link } from "react-router-dom";
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';
import axios from "axios";

class VerifyEmail extends Component {
   constructor(props, context) {
      super(props, context);

      this.state = {
         verificationMessage: ''
      };
   }

   componentDidMount() {
      const url_string = window.location.href;
      const url = new URL(url_string);
      const key = url.searchParams.get("k");
      console.log('key:', key);
      this.verifyEmailAddress(key);
   }

   verifyEmailAddress = key => {
      axios.put('api/auth/verifyEmail/' + key)
         .then(res => {
            console.log('register res.data:', res.data);
            this.setState({
               verificationMessage: 'Your email address has been validated. ' +
                  'Please click the link below to return to the home page and log in.'
            });
         })
         .catch(err => {
            console.log(err);
            this.setState({
               verificationMessage: 'Error encountered. Unable to verify email address.'
            });
         });
   }

   render() {
      return (
         <div id="verify-email-div">
            <p>{this.state.verificationMessage}</p>
            <Link to={"/Home"} className="nav-link active"
               style={{ 
                  visibility: this.state.verificationMessage ? 'visible' : 'hidden',
                  color: 'white'
               }}
            >
               Home
            </Link>
         </div>
      );
   }
}

export default VerifyEmail;