import React, { Component } from 'react';
import { Container, Col, Row, Image, Button } from 'react-bootstrap';
import propTypes from 'prop-types';

class CardDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product_id: this.props.match ? this.props.match.params.product_id : undefined,
            card_details: undefined,
            errors: []
        };
    }

    componentDidMount() {
        const productId = this.state.product_id;
        this.props.cardService.getCardDetails(productId)
            .then(cardDetails => {
                this.setState({
                    card_details: cardDetails,
                });
            }).catch(error => {
                this.setState({
                    errors: this.state.errors.push(error),
                })
            });
    }

    render() {
        return (
            <Container data-testid="card-details__container" className="card-details__container">
                <Row data-testid="card-details__row" className="card-details__row">
                    <Col data-testid="card-details__column-1" className="card-details__column-1">
                        <Image
                            data-testid="card-details__image"
                            className="card-details__image"
                            src={this.state.card_details ? this.state.card_details.ImageUrls[0].ImageUrl : null}
                            alt={this.state.card_details ? this.state.card_details.Title : null}
                            fluid
                        />
                    </Col>
                    <Col data-testid="card-details__column-2" className="card-details__column-2">
                        <Row data-testid="card-details__column-2-row1" className="card-details__column-2-row-1">
                            <h2 data-testid="card-details__title" className="card-details__title">
                                {this.state.card_details ? this.state.card_details.Title : null}
                            </h2>
                        </Row>
                        <Row data-testid="card-details__column-2-row2" className="card-details__column-2-row-2">
                            <Button
                                data-testid="card-details__button"
                                size="lg"
                                className="card-details__button"
                                href={this.state.card_details ? this.state.card_details.ProductUrl : null}
                            >
                                Buy Me!
                            </Button>
                        </Row>
                    </Col>
                </Row>
            </Container >
        )
    }
}

CardDetails.propTypes = {
    cardInfo: propTypes.object,
    cardService: propTypes.object,
}

export default CardDetails;
