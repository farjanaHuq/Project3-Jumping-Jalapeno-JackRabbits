import React, { Component } from "react";
import '../style.css'

class Form extends Component {

   handleSubmit = event => {
      event.preventDefault();
      const searchTerm = document.getElementById('bookInput').value;
      console.log('searchTerm:', searchTerm);
      this.props.populateBooks(searchTerm);
   }

   render() {
      return (
         <form className="d-flex flex-column" onSubmit={this.handleSubmit}>
            <div className="form-group">
               <label htmlFor="bookInput">Search Books</label>
               <input type="text" className="form-control" id="bookInput" placeholder="Leave blank to search all books" name="bookInput" />
            </div>
            <button type="submit" className="btn btn-primary align-self-end">Submit</button>
         </form>
      );
   }
}

export default Form;