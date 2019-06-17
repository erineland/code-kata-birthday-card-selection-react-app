import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import propTypes from 'prop-types';

class CardDetails extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container data-testid="card-details__container">

            </Container>
        )
    }
}

CardDetails.propTypes = {
    cardInfo: propTypes.object,
}

export default CardDetails;
