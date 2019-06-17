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
      console.info(`The response from the Moonpig cards API is: ${JSON.stringify(cards)}`);
      this.setState({
        cards: cards.Products,
      });
    }).catch(error => {
      console.error(`cardGrid.componentDidMount Error: ${error.message}`);
      this.setState({
        errors: this.state.errors.push(error),
      })
    });
  }

  render() {
    return (
      <Container data-testid="card-grid" className="card-grid__container">
        {
          this.state.cards.map((currentCard, index) => {
            return (
              <Card data-testid={`card-grid__card-item-${index}`} className="card-grid__card-item">
                <Card.Link href={`/card-details/${currentCard.MoonpigProductNo}`}>
                  <Card.Img variant="top" src={currentCard.ProductImage.Link.Href} alt={currentCard.title} />
                </Card.Link>
                {/* <Card.Body>
                  <Card.Title>{currentCard.Title}</Card.Title>
                  <Card.Text>{currentCard.Description}</Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroupItem>Price: {currentCard.Price.currency}{currentCard.Price.Value}</ListGroupItem>
                  <ListGroupItem>Rating: {currentCard.Reviews.AverageReviewRating}</ListGroupItem>
                  <ListGroupItem>Total Reviews: {currentCard.Reviews.ReviewCount}</ListGroupItem>
                </ListGroup>
                <Card.Body>
                  <Card.Link href={currentCard.ProductLink.Href}>Card Link</Card.Link>
                </Card.Body> */}
              </Card>)
          })
        }
      </Container>
    )
  }
}

CardGrid.propTypes = {
  cardService: propTypes.object,
}

export default CardGrid;
