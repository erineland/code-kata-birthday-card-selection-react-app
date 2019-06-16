import CardService from '../../../src/client/services/card-service';

describe('Card Service', () => {
    let newCardService;
    const mockCards = {
        data: ['card1', 'card2']
    }
    const mockAxiosGet = jest.fn(() => Promise.resolve(mockCards));
    const mockAxios = {
        get: mockAxiosGet,
    };

    beforeEach(() => {
        newCardService = new CardService(mockAxios);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('When a card service is instantiated', () => {
        it('Returns a new card service instance', () => {
            expect(newCardService).toBeInstanceOf(CardService);
        });

        it('Can take an instance of axios and assign this to a property', () => {
            expect(newCardService.axios).toEqual(mockAxios);
        });
    });

    describe('When the getCards method is invoked', () => {
        it('Makes a network call via axios to the cards endpoint', async () => {
            const cardsToRender = await newCardService.getCards();
            expect(
                mockAxios.get
            ).toHaveBeenCalledWith(
                '/api/products?size=20&fq=card_shop_id:1'
            )
        });

        describe('When the network call to the cards endpoint fails', () => {
            it('Returns the list of cards to the caller', async () => {
                const cardsToRender = await newCardService.getCards();
                expect(
                    cardsToRender
                ).toEqual(
                    mockCards.data
                );
            });
        })

        describe('When the network call to the cards endpoint succeeds', () => {

        });
    });
})
