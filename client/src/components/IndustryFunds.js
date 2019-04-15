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

   selectIndustry = (event) => {
      event.preventDefault();
      // this.props.getIndustryData(event.target.textContent);
      console.log(event.target.textContent);
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
                     <tr key={`industry-row-${i}`}>
                        <td>
                           <a href="" onClick={this.selectIndustry} className="" color="primary">
                              {elem['@attributes'].industry_name}
                           </a>
                        </td>
                        <td>{`$${this.addCommas(elem['@attributes'].total)}`}</td>
                        <td>{`$${this.addCommas(elem['@attributes'].indivs)}`}</td>
                        <td>{`$${this.addCommas(elem['@attributes'].pacs)}`}</td>
                     </tr>
                  ))}
               </tbody>
            </table>


         </div>
      );
   }
}

export default IndustryFunds;