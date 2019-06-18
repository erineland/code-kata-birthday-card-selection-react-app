import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  InputGroup,
  Alert,
  Button,
  FormControl,
} from 'react-bootstrap';
import propTypes from 'prop-types';

class CardGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCards: [],
      cards: [],
      errors: [],
      inputField: undefined,
      searchButtonActive: false,
    }
    this.handleCardSearch = this.handleCardSearch.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
  }

  componentDidMount() {
    this.props.cardService.getCards().then(cards => {
      // console.info(`The response from the Moonpig cards API is: ${JSON.stringify(cards)}`);
      this.setState({
        cards: cards.Products,
        allCards: cards.Products,
      });
    }).catch(error => {
      // console.error(`cardGrid.componentDidMount Error: ${error.message}`);
      this.setState({
        errors: this.state.errors.push(error),
      })
    });
  }

  updateInputValue(evt) {
    this.setState({
      inputfield: evt.target.value
    });
  }

  handleCardSearch() {
    if (!this.state.searchButtonActive && this.state.inputfield) {
      //Filter list based on filter value.
      var filteredCards = this.props.cardService.filterCards(this.state.inputfield);

      this.setState({
        cards: filteredCards,
        searchButtonActive: true
      });
    } else if (this.state.searchButtonActive) {
      //show all cards again.
      this.setState({
        cards: this.state.allCards,
        searchButtonActive: false,
      })
    }
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleCardSearch();
    }
  }

  render() {
    let cardList = this.state.cards;

    return (
      <Container data-testid="card-grid" className="card-grid__container">
        <Row data-testid="card-grid__title-row" className="card-grid__title-row">
          <h1 data-testid="card-grid__title">Greetings Cards!</h1>
        </Row>
        <Row data-testid="card-grid__filter-row" className="card-grid__filter-row">
          <InputGroup data-testid="card-grid__search-field" className="card-grid__search-field">
            <FormControl
              data-testid="card-grid__search-input"
              className="card-grid__search-input"
              ref="filterField"
              onKeyPress={this.handleKeyPress}
              onChange={this.updateInputValue}
              placeholder="Filter cards here..."
              aria-label="Card Filter"
            />
            <InputGroup.Append color="secondary">
              <Button onClick={this.handleCardSearch}>
                {this.state.searchButtonActive ? 'Show All' : 'Filter'}
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Row>
        <br />
        {cardList ?
          cardList.length > 0 ?
            <Row data-testid="card-grid__card-grid-row" className="card-grid__card-grid-row">
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
            :
            <Alert
              data-testid="card-grid__no-results-warning"
              className="card-grid__no-results-warning"
              variant='warning'
            >
              Sorry, we currently have no cards for you
            </Alert>
          :
          <Alert
            variant='warning'
            data-testid="card-grid__no-cards-warning"
            className="card-grid__no-cards-warning"
          >
            Sorry, we currently have no cards for you
          </Alert>
        }
      </Container>
    )
  }
}

CardGrid.propTypes = {
  cardService: propTypes.object,
}

export default CardGrid;
