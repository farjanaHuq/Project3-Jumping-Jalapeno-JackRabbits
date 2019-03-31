import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {

   renderNavLinks = () => {
      // conditionally render nav links depending on which components are being shown
      if (this.props.page === "Search") {
         return (
            <ul className="navbar-nav">
               <li className="nav-item">
                  <Link to={"/search"} className="nav-link disabled">Page 1</Link>
               </li>
               <li className="nav-item">
                  <Link to={"/saved"} className="nav-link active">Page 2</Link>
               </li>
            </ul>
         );
      } else if (this.props.page === "Saved") {
         return (
            <ul className="navbar-nav">
               <li className="nav-item">
                  <Link to={"/search"} className="nav-link active">Page 1</Link>
               </li>
               <li className="nav-item">
                  <Link to={"/saved"} className="nav-link disabled">Page 2</Link>
               </li>
            </ul>
         );
      }
   };

   render() {
      return (
         <nav className="navbar navbar-expand-md bg-dark navbar-dark">
            <span className="navbar-brand">Project 3</span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
               <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavbar">
               {this.renderNavLinks()}
            </div>
         </nav>
      );
   }
}

export default Navbar;