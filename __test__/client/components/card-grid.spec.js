import React from 'react';
import CardGrid from '../../../src/client/components/card-grid';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { JestEnvironment } from '@jest/environment';
import { Card } from 'react-bootstrap';
import path from 'path';
import fs from 'fs';

const pathName = path.resolve(__dirname, `../../__mocks__/validCardResults.json`);
const mockCards = JSON.parse(fs.readFileSync(pathName, 'utf8'));

describe('Card Grid', () => {
    let component;
    let getCardsMock = jest.fn(() => Promise.resolve({
        Products: mockCards
    }));
    let cardServiceMock = {
        getCards: getCardsMock
    }

    const render = customProps => {
        const props = {
            cardService: cardServiceMock,
            ...customProps
        }
        return mount(<CardGrid {...props} />);
    }

    beforeEach(() => {
        component = render();
    });

    afterEach(() => {
        jest.clearAllMocks();
    })

    describe('When loading the component', () => {
        it('renders the app as expected', () => {
            const component = renderer.create(
                <CardGrid cardService={cardServiceMock} />,
            );
            let tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        });

        it('renders a grid to house all of the available cards', () => {
            expect(
                component.find('[data-testid="card-grid"]').exists()
            ).toBeTruthy()
        });

        it('makes a call to get the list of cards to render', () => {
            expect(
                getCardsMock
            ).toHaveBeenCalled();
        });

        describe('When making the call to the cards service', () => {
            describe('When the call to the cards service succeeds', () => {
                // it('Successfully saves the list of cards onto the state', async () => {
                //     // process.nextTick(() => {
                //         expect(component.state().cards).toEqual(mockCards);
                //     // });
                // })

                // it('Renders a table with the card items', () => {
                //     process.nextTick(() => {
                //         expect(
                //             component.find('[data-testid="card-item-1"]').exists()
                //         ).toBeTruthy()
                //     });
                // })
            });

            describe('When the call to the cards service fails', () => {
                let cardServiceErrorMock;
                beforeEach(() => {
                    const getCardsErrorMock = jest.fn(() => Promise.reject(new Error('get cards error')));
                    cardServiceErrorMock = {
                        getCards: getCardsErrorMock
                    }
                });

                it('Handles the error and sets some error state', async () => {
                    const component = render({ cardService: cardServiceErrorMock });
                    process.nextTick(() => {
                        expect(component.state().errors).toBe(1);
                    });
                });
            });
        });
    });
});
