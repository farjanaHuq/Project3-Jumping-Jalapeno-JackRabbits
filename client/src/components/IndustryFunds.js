import React, { Component } from "react";
// import { Button } from 'reactstrap';
import '../style.css';
// import axios from "axios";

class IndustryFunds extends Component {
   constructor(props) {
      super(props);
      this.state = {
      };
   }

   componentDidMount() {

   }

   addCommas = number => {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
   }

   render() {
      return (
         <div className="industryFundsDiv">
            {/* {console.log(this.props.repIndustries)} */}
            <h2 className="div-header">Industries</h2>

            <table className="industriesTable">
               <thead>
                  <tr>
                     {/* table header */}
                     <th>Industry</th>
                     <th>Total</th>
                     <th>Individuals</th>
                     <th>PACs</th>
                  </tr>
               </thead>
               <tbody>
                  {Array.from(this.props.repIndustries).map((elem, i) => (
                     <tr
                        key={`industry-row-${i}`}
                        className="industry-funds-tr"
                        industryindex={i}
                        onClick={this.props.selectIndustry}
                        style={{
                           border: (this.props.selectedIndustry.index === i)
                              ? '2px solid rgb(0, 174, 255)' : ''
                        }}
                     >
                        <td industryindex={i}>
                           <span industryindex={i} color="primary">
                              {elem['@attributes'].industry_name}
                           </span>
                        </td>
                        <td industryindex={i}>{`$${this.addCommas(elem['@attributes'].total)}`}</td>
                        <td industryindex={i}>{`$${this.addCommas(elem['@attributes'].indivs)}`}</td>
                        <td industryindex={i}>{`$${this.addCommas(elem['@attributes'].pacs)}`}</td>
                     </tr>
                  ))}
               </tbody>
            </table>


         </div>
      );
   }
}

export default IndustryFunds;