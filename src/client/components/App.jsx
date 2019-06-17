import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import PropTypes from 'prop-types';
import CardGrid from '../components/card-grid.jsx';
import CardDetails from '../components/card-details.jsx';

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
        <Route
          path="/card-details/"
          render={() => {
            return <CardDetails />
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
