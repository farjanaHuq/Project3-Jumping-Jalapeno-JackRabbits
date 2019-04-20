import React, { Component } from "react";
// import { Button } from 'reactstrap';
import '../style.css';

class Legislation extends Component {
   constructor(props) {
      super(props);
      this.state = {
      };
   }

   componentDidMount() {

   }

   render() {
      console.log('specificMemberVotes:', this.props.specificMemberVotes);

      return (
         <div id="legislationDiv">
            <h2 className="div-header">Recent Votes</h2>

            <table id="legislationTable">
               <thead>
                  <tr>
                     {/* table header */}
                     <th>Number</th>
                     <th>Description</th>
                     <th>Date</th>
                     <th>Question</th>
                     <th>Position</th>
                  </tr>
               </thead>
               <tbody>
                  {this.props.specificMemberVotes.map((elem, i) => (
                     <tr className="legislation-row" key={`legislation-row-${i}`}>
                        <td>{elem.billNumber}</td>
                        <td>{elem.description}</td>
                        <td className="legislation-date-td">{elem.date}</td>
                        <td className="legislation-question-td">{elem.question}</td>
                        <td>{elem.position}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      );
   }
}

export default Legislation;