import React, { Component } from "react";
import '../style.css';
import { Link } from "react-router-dom";
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';
// import axios from "axios";

class VerifyEmail extends Component {
   constructor(props, context) {
      super(props, context);

      this.state = {
      };
   }

   componentDidMount() {
      // const url_string = window.location.href;
      // const url = new URL(url_string);
      // const key = url.searchParams.get("k");
      // console.log('key:', key);
   }

   render() {
      return (
         <div>
            <Link to={"/Home"} className="nav-link active">Home</Link>
         </div>
      );
   }
}

export default VerifyEmail;