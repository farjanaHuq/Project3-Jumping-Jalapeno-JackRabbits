import React, { Component } from "react";
import '../style.css'

class Jumbotron extends Component {

   render() {
      return (
         <div className="jumbotron jumbotron-fluid">
            <div className="container">
               <h1>Jumping Jalapeno Jackrabbits</h1>
               <span>Project 3</span>
            </div>
         </div>
      );
   }
}

export default Jumbotron;