import React, { Component } from "react";
// import { Button } from 'reactstrap';
import '../style.css';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

class Legislation extends Component {
   constructor(props) {
      super(props);
      this.state = {
      };
   }

   componentDidMount() {

   }



   renderNavTabs = numberOfPages => {
      // create an array of numbers just to be able to map over in the JSX
      const pagesNumArr = [];
      for (let i = 1; i < numberOfPages + 1; i++) {
         pagesNumArr.push(i.toString());
      }

      return (
         <Nav tabs className="nav-tabs-div d-flex flex-row">
            {pagesNumArr.map((elem, i) => (
               <NavItem key={`nav-tab-${i}`} className="nav-tab">
                  <NavLink
                     className={classnames({ active: this.props.activeTab === (elem) })}
                     onClick={() => { this.props.toggle(elem); }}
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
         <TabContent activeTab={this.props.activeTab} >
            {singlePagesArr.map((elem, pageIndex) => (
               <TabPane tabId={(pageIndex + 1).toString()} key={`tab-content-${pageIndex + 1}`}>
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
                        {singlePagesArr[pageIndex].map((elem, i) => (
                           <tr
                              className="legislation-row"
                              key={`legislation-row-${i}`}
                              onClick={(event) => this.props.selectVote(event, singlePagesArr, pageIndex, i)}
                              style={{
                                 border: ((this.props.selectedVote.index === i) &&
                                    (this.props.selectedVote.tab === Number(this.props.activeTab)))
                                    ? '2px solid rgb(0, 174, 255)' : ''
                              }}
                           >
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
      // console.log('specificMemberVotes:', this.props.specificMemberVotes);
      // create temp member votes arr
      const tempMemberVotes = this.props.specificMemberVotes;
      const tempMemberVotesString = JSON.stringify(tempMemberVotes);
      const tempMemberVotesArr = JSON.parse(tempMemberVotesString);
      // get the number of pages
      const numberOfPages = Math.ceil(tempMemberVotesArr.length / 8);
      // console.log('number of pages:', numberOfPages);
      // create a 2 dimensional array with each vote on its respective page array
      const singlePagesArr = [];
      for (let i = 0; i < numberOfPages; i++) {
         singlePagesArr.push(tempMemberVotesArr.splice(0, 8));
      }
      // console.log('single pages array:', singlePagesArr);
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