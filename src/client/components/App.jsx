import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import PropTypes from 'prop-types';
import CardGrid from '../components/card-grid.jsx'
// const HelloWorld = () => <h1 data-testid="app-title">Hello Moonpig!</h1>;

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Route
          exact path="/"
          render={() => {
            return <CardGrid cardService={this.props.cardService} />
          }}
        />
      </Router>
    )
  }
}

App.propTypes = {
  cardService: PropTypes.object,
}

export default App;
