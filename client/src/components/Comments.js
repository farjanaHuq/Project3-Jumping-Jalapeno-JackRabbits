import React, { Component } from "react";
import '../style.css';
import { Row, Col } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
        console.log(this.props.repRatingAndComments);
        this.props.getRepRatingAndComments(
          this.props.repRatingAndComments.repCid, this.props.repRatingAndComments.repName);
        return console.log('post comment resp:', resp);
      })
      .catch(err => console.log(err));
    ;
  }

  calculateCommentRating = (elem) => {
    if (this.props.repRatingAndComments) {
      console.log('comment elem:', elem);
      const upVotes = elem.upVotes.length;
      const downVotes = elem.downVotes.length;
      const netRating = upVotes - downVotes;
      return netRating;
    }
  }

  sortCommentsByDate = () => {
    const commentsSortedByDateArr = this.props.repRatingAndComments.comments;
    const commentsSortedByDateString = JSON.stringify(commentsSortedByDateArr);
    const commentsSortedByDateStringArr = JSON.parse(commentsSortedByDateString);
    return commentsSortedByDateStringArr.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
  }

  sortCommentsByRating = () => {
    const commentsSortedByRatingArr = this.props.repRatingAndComments.comments;
    const commentsSortedByRatingString = JSON.stringify(commentsSortedByRatingArr);
    const commentsSortedByRatingStringArr = JSON.parse(commentsSortedByRatingString);
    commentsSortedByRatingStringArr.forEach(elem => {
      elem.netRating = elem.upVotes.length - elem.downVotes.length;
    });
    return commentsSortedByRatingStringArr.sort(function (a, b) {
      return b.netRating - a.netRating;
    });
  }

    // return this.props.repRatingAndComments.comments.sort(function (o1, o2) {
    //   return sort_o1_before_o2 ? -1 : sort_o1_after_o2 ? 1 : 0;
    // });

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
            {console.log(this.props.repRatingAndComments.comments)}
            {console.log(this.sortCommentsByDate())}
            {console.log(this.sortCommentsByRating())}
            {/* {console.log(this.props.repRatingAndComments.comments.sort(function (a, b) {
              return new Date(b.date) - new Date(a.date);
            }))} */}
            {this.sortCommentsByDate().map((elem, i) => (
              <div className="card" key={`comment-${i}`}>
                {/* {console.log(elem)} */}
                <div className="card-header d-flex flex-row justify-content-between">
                  <span>{elem.userDisplayName}</span>
                  <span>
                    <img
                      src="https://i.imgur.com/5iXiKuh.png"
                      style={{
                        height: '20px',
                        width: '20px',
                        filter: elem.upVotes.includes(this.props.userData.userID) ? '' : 'brightness(0) invert(1)'
                      }}
                      id={`upvote-${elem._id}`}
                      onClick={this.props.upVoteComment}
                    />

                    &nbsp;&nbsp;{this.calculateCommentRating(elem)}&nbsp;&nbsp;
                              <img
                      src="https://i.imgur.com/APtQG6S.png"
                      style={{
                        height: '20px',
                        width: '20px',
                        filter: elem.downVotes.includes(this.props.userData.userID) ? '' : 'brightness(0) invert(1)'
                      }}
                      id={`downvote-${elem._id}`}
                      onClick={this.props.downVoteComment}
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