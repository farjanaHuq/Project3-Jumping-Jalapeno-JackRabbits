import React, { Component } from "react";
import NavbarComponent from '../components/Navbar';
import Jumbotron from '../components/Jumbotron';
import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';
import axios from "axios";

class Home extends Component {
   constructor(props) {
      super(props);
      this.state = {
         userData: { date: '', displayName: '', email: '', userID: '' }
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
      this.setState({ userData: { date: '', displayName: '', email: '', userID: '' } });
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
            <div className="container">
               <div id="mission-statement-div">
                  <h1 id="mission-statement-header">Our Mission Statement:</h1>
                  <ul>
                     <li>Our mission is to take the circus out of political voting decisions.</li>
                     <li>We encourage an informed and active participation in democracy.</li>
                     <li>Our focus is inspiring and empowering our fellow voters to make their own political assessments.</li>
                     <li>We value facts over empty information or misleading propaganda.</li>
                     <li>Our goal is to create a visual platofrm for citizens to use as a tool for this voting decisions.</li>
                  </ul>
               </div>
               <div id="rabbit-div">
                  <img id="rabbit-image" src="https://i.ibb.co/nntb7ZN/patriotic-rabbit.png"></img>
               </div>
            </div>
         </div>
      );
   }
}

export default Home;