import React, { Component } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import propTypes from 'prop-types';

class CardGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      errors: [],
    }
  }

  componentDidMount() {
    this.props.axiosInstance.getCards().then(cards => {
      this.setState({
        cards: cards,
      });
    }).catch(error => {
      this.setState({
        errors: this.state.errors.push(error),
      })
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
