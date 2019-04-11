import React, { Component } from "react";
import '../style.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from "axios";

class LoginModal extends Component {
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
      document.getElementById('email-error-message').style.visibility = 'hidden';
      const email = document.getElementById('emailField').value;
      // console.log('email:', email);
      const password = document.getElementById('passwordField').value;
      // console.log('password:', password);

      axios.post('/api/auth/login', {
         email: email,
         password: password
      })
         .then(res => {
            // console.log('login res.data:', res.data);
            localStorage.setItem('token', res.data.token);
            this.props.handleLoginData();
            this.props.handleClose();
         })
         .catch(err => {
            console.log(err);
            document.getElementById('email-error-message').style.visibility = 'visible';
         });
   }

   render() {
      return (
         <div>
            <Modal show={this.props.show} onHide={this.props.handleClose}>
               <Modal.Header closeButton>
                  <Modal.Title>Login</Modal.Title>
               </Modal.Header>
               <Form>
                  <Modal.Body>
                     <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control id="emailField" type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted error-message" id="email-error-message">
                           That email address does not match any records in our database.
                        </Form.Text>
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

export default LoginModal;