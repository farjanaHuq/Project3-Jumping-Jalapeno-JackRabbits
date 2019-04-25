
import React, { Component } from "react";
import '../style.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from "axios";

class SignupModal extends Component {
   constructor(props, context) {
      super(props, context);

      this.state = {
         emailValidation: '',
         confirmPasswordValidation: ''

      };
   }

   handleInputChange = event => {
      event.preventDefault();

      //Expected a conditional expression and instead saw an assignment
      const getEmail = document.getElementById('emailField').value;
      const password = document.getElementById('passwordField').value;
      const confirmPassword = document.getElementById('confirmPasswordField').value;

      // confirm valid email format
      const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const validateEmailFormat = regex.test(getEmail);
       console.log(validateEmailFormat);
      
       //Validating front end email
      if(getEmail === null || validateEmailFormat ){
         this.setState({ emailValidation: 'is-valid form-control' });
         document.getElementById('emailValidation-error-message').textContent = '';
      }
      else if( !validateEmailFormat){
         this.setState({ emailValidation: 'is-invalid form-control' });
         setTimeout(function () {
            document.getElementById('emailValidation-error-message').textContent = "Invalid Email";
         }, 500);
      }
      else{
         console.log("foo");
      }
    
      if ((password === confirmPassword) || (confirmPassword === '') || (password === '')) {
         this.setState({ confirmPasswordValidation: 'is-valid form-control' });
         document.getElementById('password-error-message').textContent = '';

      } else {
         this.setState({ confirmPasswordValidation: 'is-invalid form-control' });
         document.getElementById('password-error-message').textContent = "Password does not match";

      }
   };

   handleSubmit = event => {
      event.preventDefault();
      // save input field data to object
      const signupData = {
         email: document.getElementById('emailField').value,
         displayName: document.getElementById('displayNameField').value,
         password: document.getElementById('passwordField').value
      }

      // generate random email validation key
      var emailValidationKey = '';
      for (var i = 0; i < 35; i++) {
         var RNG = Math.floor(Math.random() * 15);
         if (RNG === 10) { RNG = 'a' } else if (RNG === 11) { RNG = 'b' } else if (RNG === 12) { RNG = 'c' }
         else if (RNG === 13) { RNG = 'd' } else if (RNG === 14) { RNG = 'e' } else if (RNG === 15) { RNG = 'f' }
         else if (RNG === 16) { RNG = 'g' } else if (RNG === 17) { RNG = 'h' } else if (RNG === 18) { RNG = 'i' }
         else if (RNG === 19) { RNG = 'j' } else if (RNG === 20) { RNG = 'k' } else if (RNG === 21) { RNG = 'l' }
         else if (RNG === 22) { RNG = 'm' } else if (RNG === 23) { RNG = 'n' } else if (RNG === 24) { RNG = 'o' }
         else if (RNG === 25) { RNG = 'p' } else if (RNG === 26) { RNG = 'q' } else if (RNG === 27) { RNG = 'r' }
         else if (RNG === 28) { RNG = 's' } else if (RNG === 29) { RNG = 't' } else if (RNG === 30) { RNG = 'u' }
         else if (RNG === 31) { RNG = 'v' } else if (RNG === 32) { RNG = 'w' } else if (RNG === 33) { RNG = 'x' }
         else if (RNG === 34) { RNG = 'y' } else if (RNG === 35) { RNG = 'z' }
         emailValidationKey += RNG;
      }
      console.log('emailValidationKey:', emailValidationKey);
      signupData.validationKey = emailValidationKey;
      // post it to api
      axios.post('/api/auth/register', signupData)
         .then(res => {
            console.log('register data:', res.data);
            if (res.data = "Email already exist") {
               document.getElementById('emailValidation-error-message').textContent = "Email already exist";
            }
            else {
               this.props.handleClose();
               alert('Account created. Please follow the link sent to your email address to activate your new account.');
            }
         })
         .catch(err => console.log(err));
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
                     <Form.Group >
                        <Form.Label>Email address</Form.Label>
                        <Form.Control className={this.state.emailValidation}
                           id="emailField"
                           type="email"
                           placeholder="Enter email"
                           onChange={this.handleInputChange}
                        />
                        <Form.Text className="text-danger error-message" id="emailValidation-error-message"></Form.Text>
                     </Form.Group>
                     <Form.Group>
                        <Form.Label>Display Name</Form.Label>
                        <Form.Control id="displayNameField" type="text" placeholder="Enter name" />
                     </Form.Group>
                     <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control id="passwordField"
                           type="password"
                           placeholder="Password"
                           onChange={this.handleInputChange}
                        />
                     </Form.Group>
                     <Form.Group>
                        <Form.Label>ConfirmPassword</Form.Label>
                        <Form.Control className={this.state.confirmPasswordValidation}
                           id="confirmPasswordField"
                           type="password"
                           placeholder="Confirm Password"
                           onChange={this.handleInputChange}
                        />
                        <Form.Text className="text-danger error-message" id="password-error-message"></Form.Text>
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

export default SignupModal;