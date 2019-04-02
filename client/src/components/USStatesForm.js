import React, { Component } from "react";
import '../style.css';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


class USStatesForm extends Component {

   handleSubmit = event => {
      event.preventDefault();
      const searchTerm = document.getElementById('bookInput').value;
      console.log('searchTerm:', searchTerm);
      this.props.populateBooks(searchTerm);
   }

   render() {
      return (
         <div className="container">
            <Form>
               <FormGroup>
                  <Label for="exampleSelect">Select</Label>
                  <Input type="select" name="select" id="USStateSelect">
                     <option>1</option>
                     <option>2</option>
                     <option>3</option>
                     <option>4</option>
                     <option>5</option>
                  </Input>
               </FormGroup>
               <Button>Submit</Button>
            </Form>
         </div>
      );
   }
}

export default USStatesForm;