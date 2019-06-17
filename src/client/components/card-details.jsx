import React, { Component } from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
import propTypes from 'prop-types';

class CardDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe_id: this.props.match ? this.props.match.params.moonpig_product_id : undefined,
            errors: []
        };
    }

    render() {
        return (
            <Container data-testid="card-details__container">
                <Col data-testid="card-details__column-1"></Col>
                <Col data-testid="card-details__column-2"></Col>
            </Container>
        )
    }
}

CardDetails.propTypes = {
    cardInfo: propTypes.object,
}

export default CardDetails;
