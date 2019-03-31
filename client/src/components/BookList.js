import React, { Component } from "react";
import '../style.css';
import BookDiv from './BookDiv';

class BookList extends Component {

   render() {
      return (
         <div>
            {this.props.books.map((elem, i) => (
               <BookDiv
                  key={elem._id}
                  page={this.props.page}
                  book={elem}
                  populateSaves={this.props.populateSaves}
               />
            ))}
         </div>
      );
   }
}

export default BookList;