import React, { Component } from "react";
import '../style.css';
import { Row, Col } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";

class Comments extends Component {
   constructor(props) {
      super(props);
      this.state = {
      };
   }

   componentDidMount() {
   }

   showAddCommentBtns = () => {
      this.setState({ addCommentBtnsVisibility: true });
   }

   hideAddCommentBtns = () => {
      this.setState({ addCommentBtnsVisibility: false });
   }

   addComment = event => {
      event.preventDefault();
      console.log(this.props.repRatingAndComments);
      axios.post('/api/secureCommentAndRatingRoutes/comment', {
         userID: this.props.userData.userID,
         repCid: this.props.repRatingAndComments.repCid,
         message: document.getElementById('add-comment').value,
         userEmail: this.props.userData.userEmail,
         userDisplayName: this.props.userData.displayName
      })
         .then(resp => {
            document.getElementById('add-comment').value = '';
            this.hideAddCommentBtns();
            this.props.getRepRatingAndComments();
            return console.log('post comment resp:', resp);
         })
         .catch(err => console.log(err));
      ;
   }


   render() {
      return (
         <div id="comment-component-div">
            <Row>
               <h2 className="div-header">Comments</h2>
               <Form className="d-flex flex-column" id="add-comment-form" onSubmit={this.addComment}>
                  <FormGroup>
                     <Label for="add-comment">Add Comment</Label>
                     <Input type="textarea" rows="4" name="add-comment" id="add-comment" onClick={this.showAddCommentBtns} />
                  </FormGroup>
                  <span className="d-flex flex-row justify-content-end" id="add-comment-btn-span"
                     style={{
                        visibility: (this.state.addCommentBtnsVisibility) ? 'visible' : 'hidden',
                        height: (this.state.addCommentBtnsVisibility) ? 'auto' : 0
                     }}
                  >
                     <Button onClick={this.hideAddCommentBtns}>Cancel</Button>
                     <Button>Submit</Button>
                  </span>
               </Form>
            </Row>

            <Row>
               <Col md="6">
                  <h3>Top Rated</h3>
               </Col>
               <Col md="6">
                  <h3>Most Recent</h3>
                  {this.props.repRatingAndComments.comments.map((elem, i) => (
                     <div className="card" key={`comment-${i}`}>
                        {console.log(elem)}
                        <div className="card-header d-flex flex-row justify-content-between">
                           <span>{elem.userDisplayName}</span>
                           <span>
                              <FontAwesomeIcon icon="thumbs-up"
                              />
                              {/* &nbsp;&nbsp;{this.props.calculateRatingPercent()}&nbsp;&nbsp; */}
                              <FontAwesomeIcon icon="thumbs-down"
                              />
                           </span>
                        </div>
                        <div className="card-body">
                           {elem.message}
                        </div>
                     </div>
                  ))}
               </Col>
            </Row>

         </div>
      );
   }
}

export default Comments;