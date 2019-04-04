import React, { Component } from "react";
import { Link } from "react-router-dom";
import LoginModal from '../components/LoginModal';
import SignupModal from './SignupModal(farjana)';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

class NavbarComponent extends Component {
   constructor(props) {
      super(props);
      this.state = {
         loggedIn: false,
         signupModalShow: false,
         loginModalShow: false
      };
   }

   componentDidMount() {
   }

   handleLoginState = () => {
      if (this.propsUserData) {
         this.setState({ loggedIn: true });
      } else {
         this.setState({ loggedIn: false });
      }
   }

   // handle login/signup modal toggles
   handleSignupShow = () => this.setState({ signupModalShow: true });
   handleSignupClose = () => this.setState({ signupModalShow: false });
   handleLoginShow = () => this.setState({ loginModalShow: true });
   handleLoginClose = () => this.setState({ loginModalShow: false });

   // conditional rendering
   renderNavLinks = () => {
      if (this.props.page === "Home") {
         return (
            <Nav className="mr-auto">
               <Link to={"/Home"} className="nav-link disabled">Home</Link>
               <Link to={"/Representatives"} className="nav-link active">Representatives</Link>
            </Nav>
         )
      } else if (this.props.page === "Representatives") {
         return (
            <Nav className="mr-auto">
               <Link to={"/Home"} className="nav-link active">Home</Link>
               <Link to={"/Representatives"} className="nav-link disabled">Representatives</Link>
            </Nav>
         )
      }
   };
   renderLoginLinks = () => {
      if (!this.props.userData) {
         return (
            <Nav>
               <Navbar.Text onClick={this.handleLoginShow} className="nav-link active">Log In</Navbar.Text>
               <Navbar.Text onClick={this.handleSignupShow} className="nav-link active">Sign Up</Navbar.Text>
            </Nav>
         );
      } else {
         return (
            <Nav>
               <Navbar.Text className="nav-link active" id="logged-in-msg">
                  Logged in as: {this.props.userData.displayName}
               </Navbar.Text>
               <Navbar.Text onClick={this.props.handleLogout} className="nav-link active">Log Out</Navbar.Text>
            </Nav>
         )
      }
   }

   render() {
      return (
         <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            {console.log(this.props.userData)}
            <Navbar.Brand>React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
               {this.renderNavLinks()}
               {this.renderLoginLinks()}
            </Navbar.Collapse>
            <SignupModal
               show={this.state.signupModalShow}
               handleShow={this.handleSignupShow}
               handleClose={this.handleSignupClose}
            />
            <LoginModal
               show={this.state.loginModalShow}
               handleShow={this.handleLoginShow}
               handleClose={this.handleLoginClose}
               handleLogin={this.handleLoginSubmit}
               handleLoginData={this.props.handleLoginData}
            />
         </Navbar>
      )
   }
}

export default NavbarComponent;