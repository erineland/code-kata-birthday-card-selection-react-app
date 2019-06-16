import React, { Component } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import propTypes from 'prop-types';

class CardGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
    }
  }

  componentDidMount() {
    // Upon mounting, make an asynchronous call for the cards
    this.props.axiosInstance.getCards().then(cards => {
      // Assign the cards to the state!
      this.setState({
        cards: cards,
      });
    }).catch(error => {
      // TODO: Register an error state and display an error message
    });
  }

  render() {
    return (
      <Container data-testid="card-grid" className="card-grid__container">
      </Container>
    )
  }
}

CardGrid.propTypes = {
  axiosInstance: propTypes.func,
}

export default CardGrid;
