import React, { Component } from "react";
import '../style.css';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from "axios";

class USStatesForm extends Component {

   handleRepSubmit = event => {
      event.preventDefault();
      const selectedState = document.getElementById('USStateSelect').value;
      axios.get('/api/opensecrets/repsbystate/' + selectedState)
         .then(resp => {
            console.log('state reps:', resp.data.response.legislator);
         })
         .catch(err => {
            console.log(err);
         });
   }


   render() {
      return (
         <div className="container">
            <Form onSubmit={this.handleRepSubmit} id="selectRepForm">
               <FormGroup>
                  <Label for="exampleSelect">Select Representative</Label>
                  <Input type="select" name="select" id="selectRep">
                     {this.props.representatives.map(elem => (
                        <option data-name={elem["@attributes"].firstlast} data-cid={elem["@attributes"].cid}>{elem["@attributes"].firstlast} ({elem["@attributes"].party}), {elem["@attributes"].office}</option>
                     ))}
                  </Input>
               </FormGroup>
               <Button>Submit</Button>
            </Form>
         </div>
      );
   }
}

export default USStatesForm;