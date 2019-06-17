import React, { Component } from 'react';
import { Container, Col, Row, Image, Button } from 'react-bootstrap';
import propTypes from 'prop-types';

class CardDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product_id: this.props.match ? this.props.match.params.moonpig_product_id : undefined,
            card_details: undefined,
            errors: []
        };
    }

    componentDidMount() {
        const moonpigProductId = this.state.product_id;
        // console.info(`The moonpigProductId is: ${moonpigProductId}`);
        this.props.cardService.getCardDetails(moonpigProductId)
            .then(cardDetails => {
                // console.info(`cardDetails.componentDidMount success`);
                // console.info(
                //     `The response from the Moonpig cards API for card details is: ${JSON.stringify(cardDetails)}`
                // );
                this.setState({
                    card_details: cardDetails,
                });
            }).catch(error => {
                // console.error(`cardDetails.componentDidMount Error: ${error.message}`);
                this.setState({
                    errors: this.state.errors.push(error),
                })
            });
    }

    render() {
        return (
            <Container data-testid="card-details__container" >
                <Row data-testid="card-details__row">
                    <Col data-testid="card-details__column-1">
                        {/* <Image src="holder.js/100px250" fluid /> */}
                    </Col>
                    <Col data-testid="card-details__column-2">

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
