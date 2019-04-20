import React, { Component } from "react";
// import { Button } from 'reactstrap';
import '../style.css';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

class Legislation extends Component {
   constructor(props) {
      super(props);
      this.toggle = this.toggle.bind(this);
      this.state = {
         activeTab: '1'
      };
   }

   componentDidMount() {

   }

   toggle(tab) {
      if (this.state.activeTab !== tab) {
         this.setState({
            activeTab: tab
         });
      }
   }

   renderNavTabs = (numberOfPages) => {
      // create an array of numbers just to be able to map over in the JSX
      const pagesNumArr = [];
      for (let i = 1; i < numberOfPages + 1; i++) {
         pagesNumArr.push(i.toString());
      }

      return (
         <Nav tabs className="nav-tabs-div d-flex flex-row">
            {pagesNumArr.map((elem, i) => (
               <NavItem key={`nav-tab-${i}`}>
                  <NavLink
                     className={classnames({ active: this.state.activeTab === (elem) })}
                     onClick={() => { this.toggle(elem); }}
                  >
                     {'Page ' + elem}
                  </NavLink>
               </NavItem>
            ))}
         </Nav>
      );
   }

   renderTabContent = singlePagesArr => {
      return (
         <TabContent activeTab={this.state.activeTab} >
            {singlePagesArr.map((elem, i) => (
               <TabPane tabId={(i + 1).toString()} key={`tab-content-${i + 1}`}>
                  <table className="legislationTable">
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
                        {singlePagesArr[i].map((elem, i) => (
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
               </TabPane>
            ))}
         </TabContent >
      );
   }

   render() {
      console.log('specificMemberVotes:', this.props.specificMemberVotes);
      // create temp member votes arr
      const tempMemberVotes = this.props.specificMemberVotes;
      const tempMemberVotesString = JSON.stringify(tempMemberVotes);
      const tempMemberVotesArr = JSON.parse(tempMemberVotesString);
      // get the number of pages
      const numberOfPages = Math.ceil(tempMemberVotesArr.length / 8);
      console.log('number of pages:', numberOfPages);
      // create a 2 dimensional array with each vote on its respective page array
      const singlePagesArr = [];
      for (let i = 0; i < numberOfPages; i++) {
         singlePagesArr.push(tempMemberVotesArr.splice(0, 8));
      }
      console.log('single pages array:', singlePagesArr);
      if (singlePagesArr.length > 0) {
         return (
            <div id="legislationDiv">
               <h2 className="div-header">Recent Votes</h2>
               {this.renderNavTabs(numberOfPages)}
               {this.renderTabContent(singlePagesArr)}
            </div >
         );
      } else {
         return (
            <div id="legislationDiv">
               <h2 className="div-header">Recent Votes</h2>
               <span>Loading Voting Record...</span>
            </div>
         );
      }
   }
}

export default Legislation;