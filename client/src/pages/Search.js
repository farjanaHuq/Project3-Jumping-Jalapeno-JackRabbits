import React, { Component } from "react";
import Navbar from '../components/Navbar';
import Jumbotron from '../components/Jumbotron';
import Form from '../components/Form';
import BookList from '../components/BookList';
import axios from "axios";

class Search extends Component {
   constructor(props) {
      super(props);
      this.state = {
         books: []
      };
   }

   populateBooks = searchTerm => {
      axios.get('/api/books/' + searchTerm)
         .then(res => this.setState({ books: res.data }))
         .catch(err => console.log(err));
   }

   render() {
      return (
         <div>
            {console.log('state.books:', this.state.books)}
            <Navbar page={'Search'} />
            <Jumbotron />
            <div className="container">
               <Form
                  populateBooks={this.populateBooks}
               />
               <BookList
                  page={'Search'}
                  books={this.state.books}
               />
            </div>
         </div>
      );
   }
}

export default Search;
