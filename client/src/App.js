import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// local components
import Home from "./pages/Home";
import Representatives from "./pages/Representatives";
import RepInfo from "./pages/RepInfo";
// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
// moment.js
import 'moment-timezone';
// font awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faThumbsUp, faThumbsDown, faUser, faSignInAlt, faSignOutAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
library.add(faThumbsUp, faThumbsDown, faUser, faSignInAlt, faSignOutAlt, faUserPlus);

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route
              exact path='/'
              component={Home}
            />
            <Route
              exact path='/Home'
              component={Home}
            />
          </Switch>
          <Route
            exact path='/Representatives'
            component={Representatives}
          />
          <Route
            exact path='/RepInfo'
            component={RepInfo}
          />
        </div>
      </Router>
    );
  }
}

export default App;
