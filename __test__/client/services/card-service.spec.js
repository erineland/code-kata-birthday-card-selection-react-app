import CardService from '../../../src/client/services/card-service';

describe('Card Service', () => {
    describe('When a card service is instantiated', () => {
        it('Returns a new card service instance', () => {
            const newCardService = new CardService();
            expect(newCardService).toBeInstanceOf(CardService);
        });

        it('Can take an instance of axios and assign this to a property', () => {
            const mockAxios = jest.fn();
            const newCardService = new CardService(mockAxios);
            expect(newCardService.axios).toEqual(mockAxios);
        });
    })
})
