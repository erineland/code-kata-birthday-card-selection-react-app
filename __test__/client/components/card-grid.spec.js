import React from 'react';
import CardGrid from '../../../src/client/components/card-grid';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

describe('Card Grid', () => {
    const render = customProps => {
        // const props = {
        //     // any default props for testing purposes go here.
        //     ...customProps
        // }
        return mount(<CardGrid />);
    }

    it('renders the app as expected', () => {
        const component = renderer.create(
            <CardGrid />,
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
});
