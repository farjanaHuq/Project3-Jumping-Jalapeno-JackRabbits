import React, { Component } from "react";
import '../style.css'

class Jumbotron extends Component {

   render() {
      return (
         <div className="jumbotron jumbotron-fluid">
            <div className="container">
               <h1>React Google Books Search</h1>
               <span>Search for and save books of interest.</span>
            </div>
         </div>
      );
   }
}

export default Jumbotron;