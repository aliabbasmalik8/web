import React, { Component } from 'react';
import Index from './components/index'
import { Route, withRouter } from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={ Index } />
      </div>
    );
  }
}

export default withRouter(App);
