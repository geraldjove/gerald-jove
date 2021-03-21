import React from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../pages/index';

function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
            <Route path="/" exact component={Home}></Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
