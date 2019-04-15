import React, { Component } from "react";
import '../style.css';
import { Row, Col } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from "axios";
import Moment from 'react-moment';

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
    // console.log(this.props.repRatingAndComments);
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
        // console.log(this.props.repRatingAndComments);
        this.props.getRepRatingAndComments(
          this.props.repRatingAndComments.repCid, this.props.repRatingAndComments.repName);
        return console.log('post comment resp:', resp);
      })
      .catch(err => console.log(err));
    ;
  }

  calculateCommentRating = (elem) => {
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
    return (
      <img
        src={direction === 'up' ? 'https://i.imgur.com/5iXiKuh.png' : "https://i.imgur.com/APtQG6S.png"}
        alt={`thumbs-${direction}`}
        style={{
          height: '20px',
          width: '20px',
          filter: elem[`${direction}Votes`].includes(this.props.userData.userID) ? '' : 'brightness(0) invert(1)'
        }}
        className={`${direction}vote-comment`}
        id={`${direction}vote-${elem._id}`}
        onClick={this.props[`${direction}VoteComment`]}
      />
    )
  }

  renderComments = (elem, cardClass, i) => {
    return (
      <div className={`card ${cardClass}`} key={`comment-${elem._id}`}>
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
          <p>{elem.message}</p>
          <span className="comment-date-text">
            Posted <Moment format="LT, MM/DD/YYYY">{elem.date}</Moment>
          </span>
        </div>
      </div>
    )
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
            <h3 id="top-rated-comments-div">Top Rated</h3>
            {/* {console.log('top 5 comments arr:\n', this.getTopFiveComments())} */}
            {this.getTopFiveComments().map((elem, i) => (
              this.renderComments(elem, 'top-rated-comments-card')
            ))}
          </Col>
          <Col md="6">
            <h3 id="most-recent-comments-div">Most Recent</h3>
            {/* {console.log('unsorted comments arr:\n', this.props.repRatingAndComments.comments)}
            {console.log('non top 5 sorted by date:\n', this.sortCommentsByDate())} */}
            {this.sortCommentsByDate().map((elem, i) => (
              this.renderComments(elem, 'most-recent-comments-card')
            ))}
          </Col>
        </Row>

      </div>
    );
  }
}

export default Comments;