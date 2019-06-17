import React, { Component } from 'react';
import { Container, Col, Row, Image, Button } from 'react-bootstrap';
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
                <Row data-testid="card-details__row">
                    <Col data-testid="card-details__column-1">
                        {/* <Image src="holder.js/100px250" fluid /> */}
                    </Col>
                    <Col data-testid="card-details__column-2">

                    </Col>
                </Row>
            </Container>
        )
    }
}

CardDetails.propTypes = {
    cardInfo: propTypes.object,
}

export default CardDetails;
