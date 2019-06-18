import React, { Component } from 'react';
import { Container, Row, Col, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
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
    this.props.cardService.getCards().then(cards => {
      // console.info(`The response from the Moonpig cards API is: ${JSON.stringify(cards)}`);
      this.setState({
        cards: cards.Products,
      });
    }).catch(error => {
      // console.error(`cardGrid.componentDidMount Error: ${error.message}`);
      this.setState({
        errors: this.state.errors.push(error),
      })
    });
  }

  render() {
    return (
      <Container data-testid="card-grid" className="card-grid__container">
        <Row data-testid="card-grid__row-1" className="card-grid__row-1">
          <h1 data-testid="card-grid__title">Greetings Cards!</h1>
        </Row>
        <Row data-testid="card-grid__row-2" className="card-grid__row-2">
          {
            this.state.cards.map((currentCard, index) => {
              return (
                <Card key={`card-grid__card-item-${index}`} data-testid={`card-grid__card-item-${index}`} className="card-grid__card-item">
                  <Card.Link href={`/card-details/${currentCard.MoonpigProductNo}`}>
                    <Card.Img variant="top" src={currentCard.ProductImage.Link.Href} alt={currentCard.Title} />
                  </Card.Link>
                </Card>)
            })
          }
        </Row>
      </Container>
    )
  }
}

CardGrid.propTypes = {
  cardService: propTypes.object,
}

export default CardGrid;
