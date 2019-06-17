import React from 'react';
import CardDetails from '../../../src/client/components/card-details';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import path from 'path';
import fs from 'fs';

const pathName = path.resolve(__dirname, `../../__mocks__/validCardDetails.json`);
const mockCardDetails = JSON.parse(fs.readFileSync(pathName, 'utf8'));

describe('Card Details', () => {
    let component;

    let getCardDetailsMock = jest.fn(() => Promise.resolve({
        ...mockCardDetails
    }));

    let cardServiceMock = {
        getCardDetails: getCardDetailsMock
    };

    const waitForAsync = () => new Promise(resolve => setImmediate(resolve))

    const render = customProps => {
        const props = {
            cardService: cardServiceMock,
            ...customProps,
        }
        return mount(<CardDetails {...props} />);
    }

    beforeEach(async () => {
        component = render();
        await waitForAsync();
        component.update();
    })

    afterEach(() => {
        component = undefined;
        jest.clearAllMocks();
    });

    it('renders the app as expected', () => {
        const component = renderer.create(
            <CardDetails {...{ cardService: cardServiceMock }} />,
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Renders a a basic card details container', async () => {
        expect(
            component.find('[data-testid="card-details__container"]').exists()
        ).toBeTruthy();
    });

    it('makes a call to get the list of cards to render', async () => {
        expect(
            getCardDetailsMock
        ).toHaveBeenCalled();
    });

    describe('When making the call to the cards service to get card details', () => {
        describe('When the call to the cards service succeeds', () => {
            it('Sets the card details on the state', () => {
                expect(
                    component.state().card_details
                ).toEqual(mockCardDetails)
            })
        });

        describe('When the call to the cards service fails', () => {
            let cardServiceErrorMock;
            beforeEach(() => {
                const getCardDetailsErrorMock = jest.fn(() => Promise.reject(new Error('get card details error')));
                cardServiceErrorMock = {
                    getCardDetails: getCardDetailsErrorMock
                }
                component = render({ cardService: cardServiceErrorMock });
            });

            it('Handles the error and sets some error state', async () => {
                expect(component.state().errors).toBe(1);
            });
        });
    });

    it('Renders a row to house the card details', () => {
        component = render();
        expect(
            component.find('[data-testid="card-details__row"]').exists()
        ).toBeTruthy();
    });

    it('Renders two columns to house the card details', () => {
        component = render();
        expect(
            component.find('[data-testid="card-details__column-1"]').exists()
        ).toBeTruthy();

        expect(
            component.find('[data-testid="card-details__column-2"]').exists()
        ).toBeTruthy();
    });

    // it('Displays an image of the card', () => {
    //     const component = render();
    //     expect(
    //         component.find('[data-testid="card-details__image"]').exists()
    //     ).toBeTruthy();
    // });
});
