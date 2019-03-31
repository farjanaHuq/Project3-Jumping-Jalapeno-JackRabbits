import React, { Component } from "react";
import Navbar from '../components/Navbar';
import Jumbotron from '../components/Jumbotron';
import BookList from '../components/BookList';
import axios from "axios";

class Saved extends Component {
   constructor(props) {
      super(props);
      this.state = {
         books: []
      };
   }

   componentDidMount() {
      // get savesArr from localStorage
      var savesArr = JSON.parse(localStorage.getItem('saves'));
      console.log('savesArr:', savesArr);
      if (savesArr) this.populateSaves(savesArr);
   }

   populateSaves = savesArr => {
      axios.get('/api/savedbooks/' + savesArr)
         .then(res => this.setState({ books: res.data }))
         .catch(err => console.log(err));
   }

   render() {
      return (
         <div>
            {console.log(this.state.books)}
            <Navbar page={'Saved'} />
            <Jumbotron />
            <div className="container">
               <BookList
                  page={'Saved'}
                  books={this.state.books}
                  populateSaves={this.populateSaves}
               />
            </div>
         </div>
      );
   }
}

export default Saved;