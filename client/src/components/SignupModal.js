import React, { Component } from "react";
import '../style.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from "axios";

class LoginModal extends Component {
   constructor(props, context) {
      super(props, context);

      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

      this.state = {
         show: false,
      };
   }

   handleClose() {
      this.setState({ show: false });
   }

   handleShow() {
      this.setState({ show: true });
   }

   handleSubmit(event) {
      event.preventDefault();
      const email = document.getElementById('emailField').value;
      console.log('email:', email);
      const displayName = document.getElementById('displayNameField').value;
      console.log('displayName:', displayName);
      const password = document.getElementById('passwordField').value;
      console.log('password:', password);

      axios.post('/auth/register', {
         email: email,
         displayName: displayName,
         password: password
      })
         .then(res => console.log('register res.data:', res.data))
         .catch(err => console.log(err));
   }

   render() {
      return (
         <div>
            <Button variant="primary" onClick={this.handleShow}>
               Placeholder Signup Button
            </Button>

            <Modal show={this.state.show} onHide={this.handleClose}>
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

export default LoginModal;