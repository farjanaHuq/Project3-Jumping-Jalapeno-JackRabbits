import React, { Component } from "react";
import '../style.css';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
// import axios from "axios";

class USStatesForm extends Component {
   constructor(props) {
      super(props);
      this.state = {
         cid: ''
      };
   }

   componentDidMount() {

   }

   handleRepSubmit = event => {
      event.preventDefault();
      // get the rep's cid #
      const e = document.getElementById("selectRep");
      const option = e.options[e.selectedIndex];
      // const dataname = option.getAttribute("dataname");
      const datacid = option.getAttribute("datacid");
      // console.log('const cid:', datacid)
      this.setState({ cid: datacid });
      // console.log('dataname:', dataname);
      // console.log('datacid:', this.state.cid);
      window.location = `/RepInfo?cid=${datacid}`;
   }


   render() {
      return (
         <div className="container">
            <Form onSubmit={this.handleRepSubmit} id="selectRepForm">
               <FormGroup>
                  <Label for="exampleSelect">Select Representative</Label>
                  <Input type="select" name="select" id="selectRep">
                     {this.props.representatives.map((elem, i) => (
                        <option
                           key={i}
                           dataname={elem["@attributes"].firstlast}
                           datacid={elem["@attributes"].cid}
                        >
                           {elem["@attributes"].firstlast} ({elem["@attributes"].party}), {elem["@attributes"].office}
                        </option>
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