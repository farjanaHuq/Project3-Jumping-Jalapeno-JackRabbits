import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Search from "./pages/Search";
import Saved from "./pages/Saved";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route
              exact path='/'
              component={Search}
            />
            <Route
              exact path='/search'
              component={Search}
            />
          </Switch>
          <Route
            exact path='/saved'
            component={Saved}
          />
        </div>
      </Router>
    );
  }
}

export default App;
