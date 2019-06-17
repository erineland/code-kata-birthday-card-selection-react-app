import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';
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
                <h1>THIS IS MY CARD DETAILS COMPONENT</h1>
            </Container>
        )
    }
}

CardDetails.propTypes = {
    cardInfo: propTypes.object,
}

export default CardDetails;
