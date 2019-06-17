import CardService from '../../../src/client/services/card-service';

describe('Card Service', () => {
    let newCardService;
    let mockAxiosGetCards;
    let mockAxiosGetCardDetails;
    const mockCards = {
        data: ['card1', 'card2']
    }
    const mockCardDetails = {
        data: {
            'title': 'test card title'
        }
    }
    mockAxiosGetCards = jest.fn(() => Promise.resolve(mockCards));
    mockAxiosGetCardDetails = jest.fn(() => Promise.resolve(mockCardDetails));
    let mockAxios = {
        get: mockAxiosGetCards,
    };
    const moonpigProductId = 'pu1162';

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

        describe('When the network call to the cards endpoint succeeds', () => {
            it('Returns the list of cards to the caller', async () => {
                const cardsToRender = await newCardService.getCards();
                expect(
                    cardsToRender
                ).toEqual(
                    mockCards.data
                );
            });
        })

        describe('When the network call to the cards endpoint fails', () => {

            // Setup the mock axios to return a network error
            beforeEach(() => {
                const mockAxiosGetFailure = jest.fn(() => Promise.reject(new Error('get cards failed')));
                mockAxios = {
                    get: mockAxiosGetFailure,
                };
                newCardService = new CardService(mockAxios);
            });

            it('Catches the error and returns a meaningful error to the caller', async () => {
                try {
                    const cardsToRender = await newCardService.getCards();
                    expect(cardsToRender).toEqual(null);
                } catch (cardServiceError) {
                    expect(cardServiceError.message).toEqual(
                        'CardService.getCards Error: get cards failed'
                    );
                }
            });
        });
    });

    describe('When the getCardDetails method is invoked', () => {
        beforeEach(() => {
            mockAxios = {
                get: mockAxiosGetCardDetails,
            }
            newCardService = new CardService(mockAxios);
        });
        it('Makes a network call via axios to the get card details endpoint', async () => {
            console.log(`moonpigProductId is: ${moonpigProductId}`);
            const cardsToRender = await newCardService.getCardDetails(moonpigProductId);
            expect(
                mockAxios.get
            ).toHaveBeenCalledWith({
                    url: `uk/api/product/product/?mpn=${moonpigProductId}`,
                    baseUrl: 'https://www.moonpig.com/'
            })
        });
    });
})
