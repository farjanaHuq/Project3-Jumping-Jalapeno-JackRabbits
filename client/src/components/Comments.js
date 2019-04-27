import React, { Component } from "react";
import '../style.css';
import { Row, Col } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from "axios";
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addCommentBtnsVisibility: false,
      commentBeingEdited: '',
      tempMessageSave: ''
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
    const tokenStr = localStorage.getItem("token");
    // console.log(this.props.repRatingAndComments);
    axios.post('/api/secureCommentAndRatingRoutes/comment',
      {
        userID: this.props.userData.userID,
        repCid: this.props.repRatingAndComments.repCid,
        message: document.getElementById('add-comment').value,
        userEmail: this.props.userData.userEmail,
        userDisplayName: this.props.userData.displayName,
        moneyTrailIndustry: this.props.selectedIndustry,
        moneyTrailVote: this.props.selectedVote
      },
      {
        headers: { "Authorization": `Bearer ${tokenStr}` }
      })
      .then(resp => {
        document.getElementById('add-comment').value = '';
        this.hideAddCommentBtns();
        // console.log(this.props.repRatingAndComments);
        this.props.getRepRatingAndComments(
          this.props.repRatingAndComments.repCid, this.props.repRatingAndComments.repName);
        return console.log('post comment resp:', resp);
      })
      .catch(err => {
        console.log(err);
        alert('Must be logged in to post a comment.');
      });
    ;
  }

  editCommentText = (event, commentID, userID, commentMessage) => {
    event.preventDefault();
    if (userID === this.props.userData.userID) {
      // set the commentbeingedited state to this comment id to apply dynamic styling
      this.setState({
        commentBeingEdited: commentID,
        tempMessageSave: commentMessage
      });
      // make the comment message editable
      document.getElementById(`comment-message-${commentID}`).contentEditable = "true";
    }
  }

  confirmEditCommentText = (event, commentID, userID, commentMessage) => {
    event.preventDefault();
    const tokenStr = localStorage.getItem("token");
    // make the comment message no longer editable
    document.getElementById(`comment-message-${commentID}`).contentEditable = "false";
    // clear the edit comment-related states
    this.setState({
      commentBeingEdited: '',
      tempMessageSave: ''
    });
    if (userID === this.props.userData.userID) {
      axios.put('/api/secureCommentAndRatingRoutes/editcomment/' + commentID,
        { message: commentMessage },
        { headers: { "Authorization": `Bearer ${tokenStr}` } }
      )
        .then(resp => {
          this.props.getRepRatingAndComments(
            this.props.repRatingAndComments.repCid, this.props.repRatingAndComments.repName);
          return console.log('post comment resp:', resp);
        })
        .catch(err => {
          console.log(err);
        });
      ;
    }
  }

  cancelEditCommentText = (event, commentID) => {
    event.preventDefault();
    // make the comment message no longer editable
    document.getElementById(`comment-message-${commentID}`).contentEditable = "false";
    // restore the orignal message
    document.getElementById(`comment-message-${commentID}`).textContent = this.state.tempMessageSave;
    // clear the edit comment-related states
    this.setState({
      commentBeingEdited: '',
      tempMessageSave: ''
    });
  }

  deleteComment = (event, commentID, userID) => {
    event.preventDefault();
    const tokenStr = localStorage.getItem("token");
    if (userID === this.props.userData.userID) {
      axios.delete('/api/secureCommentAndRatingRoutes/comment/' + commentID,
        { headers: { "Authorization": `Bearer ${tokenStr}` } }
      )
        .then(resp => {
          this.props.getRepRatingAndComments(
            this.props.repRatingAndComments.repCid, this.props.repRatingAndComments.repName);
          return console.log('post comment resp:', resp);
        })
        .catch(err => {
          console.log(err);
        });
      ;
    }
  }

  calculateCommentRating = elem => {
    if (this.props.repRatingAndComments) {
      // console.log('comment elem:', elem);
      const upVotes = elem.upVotes.length;
      const downVotes = elem.downVotes.length;
      const netRating = upVotes - downVotes;
      if (netRating > 0) return '+' + netRating;
      return netRating;
    }
  }

  sortCommentsByRating = () => {
    // get comments arr from state
    const commentsSortedByRatingArr = this.props.repRatingAndComments.comments;
    // stringify and parse it so original array isn't affected
    const commentsSortedByRatingString = JSON.stringify(commentsSortedByRatingArr);
    const commentsSortedByRatingStringArr = JSON.parse(commentsSortedByRatingString);
    // apply a net rating property to each element
    commentsSortedByRatingStringArr.forEach(elem => {
      elem.netRating = elem.upVotes.length - elem.downVotes.length;
    });
    // sort the new array by rating
    return commentsSortedByRatingStringArr.sort(function (a, b) {
      return b.netRating - a.netRating;
    });
  }

  getTopFiveComments = () => {
    // grab the array of comments sorted by rating a new array of just the first 5
    const topFiveCommentsArr = [];
    for (let i = 0; i < 5; i++) {
      const elem = this.sortCommentsByRating()[i];
      if (elem) topFiveCommentsArr.push(elem);
    }
    return topFiveCommentsArr;
  }

  sortCommentsByDate = () => {
    // grab the array of comments sorted by rating and splice out the first 5 comments
    const nonTopRatedComments = this.sortCommentsByRating();
    const nonTopRatedCommentsString = JSON.stringify(nonTopRatedComments);
    const nonTopRatedCommentsStringArr = JSON.parse(nonTopRatedCommentsString);
    nonTopRatedCommentsStringArr.splice(0, 5);
    // sort the remaining comments by date and return that array
    return nonTopRatedCommentsStringArr.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
  }

  renderThumbImage = (elem, direction) => {
    const userID = this.props.userData ? this.props.userData.userID : ''
    return (
      <img
        src={direction === 'up' ? 'https://i.imgur.com/5iXiKuh.png' : "https://i.imgur.com/APtQG6S.png"}
        alt={`thumbs-${direction}`}
        style={{
          height: '20px',
          width: '20px',
          filter: elem[`${direction}Votes`].includes(userID) ? '' : 'brightness(0) invert(1)'
        }}
        className={`${direction}vote-comment`}
        id={`${direction}vote-${elem._id}`}
        onClick={this.props[`${direction}VoteComment`]}
      />
    )
  }

  renderCommentMoneyTrail = elem => {
    if (elem.moneyTrailIndustry && elem.moneyTrailVote) {
      return (
        <div>
          <h5 className="money-trail-header">Money Trail</h5>
          <div className="d-flex flex-row money-trail-div">
            {/* selected industry card */}
            <div className="card selected-industry-card">
              <div className="card-body display-comment-money-trail-card-body">
                <b>Industry:</b>
                <br />
                {elem.moneyTrailIndustry.industry_name}
              </div>
            </div>
            {/* arrow div */}
            <div className="money-trail-arrow-div">
              <FontAwesomeIcon icon="arrow-right" />
            </div>
            {/* selected vote card */}
            <div className="card selected-vote-card">
              <div className="card-body display-comment-money-trail-card-body">
                <b>Vote:</b><br />
                {elem.moneyTrailVote.position}
                <hr />
                {elem.moneyTrailVote.description}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  renderComments = (elem, cardClass, i) => {
    return (
      <div className={`card ${cardClass}`} key={`comment-${elem._id}`}>
        {console.log('comment elem:', elem)}
        <div className="card-header d-flex flex-row justify-content-between">
          <span>{elem.userDisplayName}</span>
          <span>
            {this.renderThumbImage(elem, 'up')}
            &nbsp;&nbsp;
            <span
              style={{
                color: this.calculateCommentRating(elem) > 0 ? 'rgb(0, 190, 0)' :
                  this.calculateCommentRating(elem) === 0 ? 'white' : 'red'
              }}
            >
              {this.calculateCommentRating(elem)}
            </span>
            &nbsp;&nbsp;
            {this.renderThumbImage(elem, 'down')}
          </span>
        </div>
        <div className="card-body">
          {/* comment message */}
          <p
            id={`comment-message-${elem._id}`}
            style={{
              border: (this.state.commentBeingEdited === elem._id) ? '2px solid rgb(0, 174, 255)' : ''
            }}
          >
            {elem.message}
          </p>
          <div>
            {this.renderCommentMoneyTrail(elem)}
          </div>
          <span className="comment-date-text">
            Posted <Moment format="LT, MM/DD/YYYY">{elem.date}</Moment>
          </span>
          <br />
          {this.renderEditAndDeleteCommentBtns(elem)}
        </div>
      </div>
    )
  }

  renderEditAndDeleteCommentBtns = elem => {
    if (elem.userID === this.props.userData.userID) {
      return (
        <div className="d-flex flex-row justify-content-end">
          <Button
            className="edit-comment-btn"
            onClick={(event) => this.editCommentText(event, elem._id, elem.userID, elem.message)}
            style={{
              visibility: (this.state.commentBeingEdited === elem._id) ? 'hidden' : 'visible',
              width: (this.state.commentBeingEdited === elem._id) ? '0' : 'initial',
              height: (this.state.commentBeingEdited === elem._id) ? '0' : 'initial',
              padding: (this.state.commentBeingEdited === elem._id) ? '0' : '6px 12px',
              marginRight: (this.state.commentBeingEdited === elem._id) ? '0' : '10px'
            }}
          >
            Edit
          </Button>
          <Button
            className="cancel-edit-comment-btn"
            onClick={(event) => this.cancelEditCommentText(event, elem._id)}
            style={{
              visibility: (this.state.commentBeingEdited === elem._id) ? 'visible' : 'hidden',
              width: (this.state.commentBeingEdited === elem._id) ? 'initial' : '0',
              height: (this.state.commentBeingEdited === elem._id) ? 'initial' : '0',
              padding: (this.state.commentBeingEdited === elem._id) ? '6px 12px' : '0',
              marginRight: (this.state.commentBeingEdited === elem._id) ? '10px' : '0'
            }}
          >
            Cancel
          </Button>
          <Button
            className="confirm-edit-comment-btn"
            onClick={(event) => this.confirmEditCommentText(
              event, elem._id, elem.userID, document.getElementById(`comment-message-${elem._id}`).textContent)}
            style={{
              visibility: (this.state.commentBeingEdited === elem._id) ? 'visible' : 'hidden',
              width: (this.state.commentBeingEdited === elem._id) ? 'initial' : '0',
              height: (this.state.commentBeingEdited === elem._id) ? 'initial' : '0',
              padding: (this.state.commentBeingEdited === elem._id) ? '6px 12px' : '0',
              marginRight: (this.state.commentBeingEdited === elem._id) ? '10px' : '0'
            }}
          >
            Confirm
          </Button>
          <Button
            onClick={(event) => this.deleteComment(event, elem._id, elem.userID)}
          >
            Delete
          </Button>
        </div>
      );
    }
  }

  render() {
    console.log('user data:', this.props.userData);
    console.log('selected industry:', this.props.selectedIndustry)
    console.log('selected vote:', this.props.selectedVote)
    return (
      <div id="comment-component-div">
        <Row>
          <Col>
            <h2 className="div-header">Comments</h2>
            <Form className="d-flex flex-column" id="add-comment-form" onSubmit={this.addComment}>
              <FormGroup>
                <Label for="add-comment">Add Comment</Label>
                <h4
                  className="money-trail-header"
                  style={{
                    visibility: (this.props.selectedIndustry || this.props.selectedVote) ? 'visible' : 'hidden',
                    height: (this.props.selectedIndustry || this.props.selectedVote) ? 'auto' : 0
                  }}
                >
                  Money Trail
                </h4>
                <div
                  className="d-flex flex-row money-trail-div"
                  style={{
                    visibility: (this.props.selectedIndustry || this.props.selectedVote) ? 'visible' : 'hidden',
                    height: (this.props.selectedIndustry || this.props.selectedVote) ? 'auto' : 0
                  }}
                >
                  <div className="card selected-industry-card">
                    <div className="card-header">Industry</div>
                    <div className="card-body">{this.props.selectedIndustry.industry_name}</div>
                  </div>
                  <div className="money-trail-arrow-div">
                    <FontAwesomeIcon icon="arrow-right" />
                  </div>
                  <div className="card selected-vote-card">
                    <div className="card-header">Vote</div>
                    <div className="card-body">{this.props.selectedVote.description}</div>
                  </div>
                </div>
                <Input type="textarea" rows="4" name="add-comment" id="add-comment" onClick={this.showAddCommentBtns} />
              </FormGroup>
              <div className="d-flex flex-row justify-content-end" id="add-comment-btn-span"
                style={{
                  visibility: (this.state.addCommentBtnsVisibility) ? 'visible' : 'hidden',
                  height: (this.state.addCommentBtnsVisibility) ? 'auto' : 0
                }}
              >
                <span id="money-trail-directions">(Optional): Select an Industry and Vote above to make a money trail.</span>
                <Button onClick={this.hideAddCommentBtns}>Cancel</Button>
                <Button>Submit</Button>
              </div>
            </Form>
          </Col>
        </Row>

        <Row>
          <Col md="6">
            <div id="top-rated-comments-div">
              <h3>Top Rated</h3>
              {/* {console.log('top 5 comments arr:\n', this.getTopFiveComments())} */}
              {this.getTopFiveComments().map((elem, i) => (
                this.renderComments(elem, 'top-rated-comments-card')
              ))}
            </div>
          </Col>
          <Col md="6">
            <div id="most-recent-comments-div">
              <h3>Most Recent</h3>
              {/* {console.log('unsorted comments arr:\n', this.props.repRatingAndComments.comments)}
                {console.log('non top 5 sorted by date:\n', this.sortCommentsByDate())} */}
              {this.sortCommentsByDate().map((elem, i) => (
                this.renderComments(elem, 'most-recent-comments-card')
              ))}
            </div>
          </Col>
        </Row>

      </div>
    );
  }
}

export default Comments;