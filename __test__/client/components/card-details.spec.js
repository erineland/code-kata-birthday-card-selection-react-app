import React from 'react';
import CardDetails from '../../../src/client/components/card-details';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

describe('Card Details', () => {
    const render = customProps => {
        const props = {
            ...customProps,
        }
        return mount(<CardDetails {...props} />);
    }

    it('renders the app as expected', () => {
        const component = renderer.create(
            <CardDetails />,
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('Renders a a basic card details container', () => {
        const component = render();
        expect(
            component.find('[data-testid="card-details__container"]').exists()
        ).toBeTruthy();
    });

    it('Renders a row to house the card details', () => {
        const component = render();
        expect(
            component.find('[data-testid="card-details__row"]').exists()
        ).toBeTruthy();
    });

    it('Renders two columns to house the card details', () => {
        const component = render();
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
