import React from 'react';
import CardGrid from '../../../src/client/components/card-grid';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { JestEnvironment } from '@jest/environment';

describe('Card Grid', () => {
    let component;
    let mockCards = ['card1', 'card2'];
    let getCardsMock = jest.fn(() => Promise.resolve(mockCards));
    let axiosInstanceMock = {
        getCards: getCardsMock
    }

    const render = customProps => {
        const props = {
            axiosInstance: axiosInstanceMock,
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
                <CardGrid axiosInstance={axiosInstanceMock} />,
            );
            let tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        });

        it('renders a grid to house all of the available cards', () => {
            expect(
                component.find('[data-testid="card-grid"]')
            ).toBeTruthy()
        });

        it('makes a call to get the list of cards to render', () => {
            expect(
                getCardsMock
            ).toHaveBeenCalled();
        });

        describe('When making the call to the cards service', () => {
            describe('When the call to the cards service succeeds',() => {
                it('Successfully saves the list of cards onto the state', async () => {
                    process.nextTick(() => {
                        expect(component.state().cards).toEqual(mockCards);
                    });
                })
            });

            describe('When the call to the cards service fails', () => {
                let axiosInstanceErrorMock;
                beforeEach(() => {
                    const getCardsErrorMock = jest.fn(() => Promise.reject(new Error('get cards error')));
                    axiosInstanceErrorMock = {
                        getCards: getCardsErrorMock
                    }
                });

                it('Handles the error and sets some error state', async () => {
                    const component = render({ axiosInstance: axiosInstanceErrorMock });
                    process.nextTick(() => {
                        expect(component.state().errors).toBe(1);
                    });
                });
            });
        });
    });
});
