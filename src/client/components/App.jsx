import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const HelloWorld = () => <h1 data-testid="app-title">Hello Moonpig!</h1>;

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={HelloWorld} />
      <Button>Hello React Bootstrap!</Button>
    </Router>
  )
}

App.propTypes = {
  axiosInstance: PropTypes.func,
}

export default App;
