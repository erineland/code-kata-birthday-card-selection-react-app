import CardService from '../../../src/client/services/card-service';
import path from 'path';
import fs from 'fs';

const pathName = path.resolve(__dirname, `../../__mocks__/validCardResults.json`);
const mockCardData = JSON.parse(fs.readFileSync(pathName, 'utf8'));

describe('Card Service', () => {
    let newCardService;
    let mockAxiosGetCards;
    let mockAxiosGetCardDetails;
    const mockCards = {
        data: {
            Products: mockCardData
        }
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
                'https://search.moonpig.com/api/products?size=20&fq=card_shop_id:1'
            )
        });

        describe('When the network call to the cards endpoint succeeds', () => {
            it('Stores the list of retrieved cards on the instance', async () => {
                const cardsToRender = await newCardService.getCards();
                expect(
                    newCardService.cachedCards
                ).toEqual(
                    mockCards.data
                );
            });

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
            const cardsToRender = await newCardService.getCardDetails(moonpigProductId);
            expect(
                mockAxios.get
            ).toHaveBeenCalledWith(
                "https://www.moonpig.com/uk/api/product/product/?mpn=pu1162"
            )
        });

        describe('When the network call to the cards endpoint succeeds', () => {
            it('Returns the list of cards to the caller', async () => {
                const cardsToRender = await newCardService.getCardDetails(moonpigProductId);
                expect(
                    cardsToRender
                ).toEqual(
                    mockCardDetails.data
                );
            });
        })

        describe('When the network call to the cards endpoint fails', () => {
            beforeEach(() => {
                const mockAxiosGetCardDetailsFailure = jest.fn(() => Promise.reject(new Error('get card details failed')));
                mockAxios = {
                    get: mockAxiosGetCardDetailsFailure,
                };
                newCardService = new CardService(mockAxios);
            });

            it('Catches the error and returns a meaningful error to the caller', async () => {
                try {
                    const cardsToRender = await newCardService.getCardDetails(moonpigProductId);
                    expect(cardsToRender).toEqual(null);
                } catch (cardServiceError) {
                    expect(cardServiceError.message).toEqual(
                        'CardService.getCardDetails Error: get card details failed'
                    );
                }
            });
        });
    });

    describe('When the filterCards method is invoked', () => {
        beforeEach(() => {
            mockAxios = {
                get: mockAxiosGetCards,
            }
            newCardService = new CardService(mockAxios);
        });

        it('Returns a list of filtered cards based on title and search input', async () => {
            await newCardService.getCards();
            const filteredCards =
                await newCardService.filterCards(
                    'Father'
                );
            expect(
                filteredCards.length
            ).toBe(
                14
            )
        });
    });
});
