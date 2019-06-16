import React from 'react';
import CardGrid from '../../../src/client/components/card-grid';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { JestEnvironment } from '@jest/environment';

describe('Card Grid', () => {
    const mockCards = ['card1', 'card2'];
    const getCardsMock = jest.fn(() => Promise.resolve(mockCards));
    const axiosInstanceMock = {
        getCards: getCardsMock
    }
    const render = customProps => {
        const props = {
            // any default props for testing purposes go here.
            axiosInstance: axiosInstanceMock,
            // Now override with any passed custom props for test purposes.
            ...customProps
        }
        return mount(<CardGrid {...props} />);
    }

    describe('When loading the component', () => {
        it('renders the app as expected', () => {
            const component = renderer.create(
                <CardGrid axiosInstance={axiosInstanceMock} />,
            );
            let tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        });

        it('renders a grid to house all of the available cards', () => {
            const component = render();

            expect(
                component.find('[data-testid="card-grid"]')
            ).toBeTruthy()
        });

        it('makes a call to get the list of cards to render', () => {
            const component = render();
            expect(
                getCardsMock
            ).toHaveBeenCalled();
        });

        describe('When making the call to the cards service', () => {
            describe('When the call to the cards service succeeds', async () => {
                it('Successfully saves the list of cards onto the state', () => {
                    const component = render();
                    process.nextTick(() => {
                        expect(component.state().cards).toEqual(mockCards);
                    });
                })
            });

            describe('When the call to the cards service fails', async () => {
                // const getCardsMock = jest.fn(() => Promise.resolve(['card1', 'card2']));
                // const axiosInstanceMock = {
                //     getCards: getCardsMock
                // }
                // const component = render({ axiosInstance: axiosInstanceMock });
            });
        });
    });
});
