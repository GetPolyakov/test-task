import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { TEST } from "./actions/testAction";
import './App.css';
import Test from "./Test";

class App extends Component {
  render() {
    return (
        <Switch>
            <Route path="/" exact render={(props) => <div>test</div>} />
            <Route path="/omg" component={Test} />
        </Switch>
    );
  }
}


export default App;
