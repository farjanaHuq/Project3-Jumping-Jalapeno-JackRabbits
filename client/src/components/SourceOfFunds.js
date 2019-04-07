import React, { Component } from "react";
import '../style.css';
// import axios from "axios";

class SourceOfFunds extends Component {
   constructor(props) {
      super(props);
      this.state = {
      };
   }

   componentDidMount() {

   }


   render() {
      return (
         <div className="sourceOfFundsDiv">
            <h2 className="div-header">Source of Funds</h2>

            <table className="fundsGraph">
               <tbody>
                  <tr>
                     <td style={{ width: `${this.props.scrapeSummary.smallPercent}` }}></td>
                     <td style={{ width: `${this.props.scrapeSummary.largePercent}` }}></td>
                     <td style={{ width: `${this.props.scrapeSummary.pacPercent}` }}></td>
                     <td style={{ width: `${this.props.scrapeSummary.selfPercent}` }}></td>
                     <td style={{ width: `${this.props.scrapeSummary.otherPercent}` }}></td>
                  </tr>
               </tbody>
            </table>

            <table className="contributionsTable">
               <thead>
                  <tr>
                     {/* table header */}
                     <th>Type</th>
                     <th>Amount</th>
                     <th>Percentage</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     {/* small */}
                     <td>{`Small Individual Contributions (< $200)`}</td>
                     <td>{this.props.scrapeSummary.smallAmount}</td>
                     <td>{this.props.scrapeSummary.smallPercent}</td>
                  </tr>
                  <tr>
                     {/* large */}
                     <td>Large Individual Contributions</td>
                     <td>{this.props.scrapeSummary.largeAmount}</td>
                     <td>{this.props.scrapeSummary.largePercent}</td>
                  </tr>
                  <tr>
                     {/* pac */}
                     <td>PAC Contributions*</td>
                     <td>{this.props.scrapeSummary.pacAmount}</td>
                     <td>{this.props.scrapeSummary.pacPercent}</td>
                  </tr>
                  <tr>
                     {/* self */}
                     <td>Candidate self-financing</td>
                     <td>{this.props.scrapeSummary.selfAmount}</td>
                     <td>{this.props.scrapeSummary.selfPercent}</td>
                  </tr>
                  <tr>
                     {/* other */}
                     <td>Other</td>
                     <td>{this.props.scrapeSummary.otherAmount}</td>
                     <td>{this.props.scrapeSummary.otherPercent}</td>
                  </tr>
               </tbody>
            </table>


         </div>
      );
   }
}

export default SourceOfFunds;