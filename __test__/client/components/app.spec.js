import React from 'react';
import App from '../../../src/client/components/app';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import path from 'path';
import fs from 'fs';

const pathName = path.resolve(__dirname, `../../__mocks__/validCardResults.json`);
const mockCards = JSON.parse(fs.readFileSync(pathName, 'utf8'));

describe('App', () => {
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
            ...customProps,
        }
        return mount(<App {...props} />);
    }

    beforeEach(() => {
        component = render();
    });

    afterEach(() => {
        jest.clearAllMocks();
    })

    it('renders the app as expected', () => {
        const component = renderer.create(
            <App cardService={cardServiceMock} />,
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('successfully renders the app', () => {
        expect(
            component.find('[data-testid="card-grid"]').exists(),
        ).toBeTruthy();
    });

    it('Assigns an object to the prop cardService when passed', () => {
        expect(component.props().cardService).toEqual(cardServiceMock);
    });
});

