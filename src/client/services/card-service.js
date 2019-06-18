export default class CardService {
    constructor(axios) {
        this.axios = axios;
        this.getCards = this.getCards.bind(this);
        this.filterCards = this.filterCards.bind(this);
        this.getCardDetails = this.getCardDetails.bind(this);
    }

    getCards() {
        return this.axios.get('https://search.moonpig.com/api/products?size=20&fq=card_shop_id:1')
            .then(response => {
                if (response.data) {
                    // Cache the retrieved cards
                    this.cachedCards = response.data;
                    return response && response.data;
                }
            })
            .catch(error => {
                const getCardsError = new Error(`CardService.getCards Error: ${error.message}`);
                console.error(getCardsError.message);
                throw getCardsError;
            });
    }

    getCardDetails(productId) {
        return this.axios.get(`https://www.moonpig.com/uk/api/product/product/?mpn=${productId}`)
            .then(response => {
                debugger;
                if (response.data) {
                    return response && response.data;
                }
            })
            .catch(error => {
                debugger;
                const getCardDetailsError = new Error(`CardService.getCardDetails Error: ${error.message}`);
                console.error(getCardDetailsError.message);
                throw getCardDetailsError;
            });
    }

    filterCards(filterTerm) {
        let matchingCards = [];

        filterTerm = filterTerm.toLowerCase();

        const cardsToFilter = this.cachedCards.Products;
        if (cardsToFilter) {
            cardsToFilter.forEach((currentCard, index, cards) => {
                if (currentCard.Title.toLowerCase().indexOf(filterTerm) > -1) {
                    matchingCards.push(currentCard);
                }
            });
        }

        return matchingCards;
    }
}
