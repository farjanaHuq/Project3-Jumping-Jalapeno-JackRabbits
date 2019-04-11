import React, { Component } from "react";
import '../style.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from "axios";

class SignUpModal extends Component {
   constructor(props, context) {
      super(props, context);

      this.state = {
      };
   }

   handleClose = () => {
      this.setState({ show: false });
   }

   handleShow = () => {
      this.setState({ show: true });
   }


   handleSubmit = event => {
      event.preventDefault();

      // get input field data
      const signupData = {
         email: document.getElementById('emailField').value,
         displayName: document.getElementById('displayNameField').value,
         password: document.getElementById('passwordField').value
      }

      // console.log('signupData:', signupData);

      // console.log("Signup data confirm password", signupData);
      // post it to api
      axios.post('/api/auth/register', signupData)
         .then(res => {
            // console.log('register res.data:', res.data);
         })
         .catch(err => {
            console.log(err);

         });
      ;

   }

   render() {
      return (
         <div>
            <Modal show={this.props.show} onHide={this.props.handleClose}>
               <Modal.Header closeButton>
                  <Modal.Title>Signup</Modal.Title>
               </Modal.Header>
               <Form>
                  <Modal.Body>
                     <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control id="emailField" type="email" placeholder="Enter email" />
                     </Form.Group>
                     <Form.Group>
                        <Form.Label>Display Name</Form.Label>
                        <Form.Control id="displayNameField" type="text" placeholder="Enter name" />
                     </Form.Group>
                     <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control id="passwordField" type="password" placeholder="Password" />
                     </Form.Group>
                  </Modal.Body>
                  <Modal.Footer>
                     <Button onClick={this.handleSubmit} variant="primary" type="submit">
                        Submit
                     </Button>
                  </Modal.Footer>
               </Form>
            </Modal>
         </div>
      );
   }
}


export default SignUpModal;