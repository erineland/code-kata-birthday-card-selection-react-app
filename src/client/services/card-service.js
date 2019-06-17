export default class CardService {
    constructor(axios) {
        this.axios = axios;
        this.favouriteRecipes = undefined;
        this.getCards = this.getCards.bind(this);
    }

    getCards() {
        return this.axios.get('/api/products?size=20&fq=card_shop_id:1')
            .then(response => {
                if (response.data) {
                    return response && response.data;
                }
            })
            .catch(error => {
                const getCardsError = new Error(`CardService.getCards Error: ${error.message}`);
                console.error(getCardsError.message);
                throw getCardsError;
            });
    }

    getCardDetails(moonpigProductId) {
        return this.axios.get({
            url: `uk/api/product/product/?mpn=${moonpigProductId}`,
            baseUrl: 'https://www.moonpig.com/'
        })
            .then(response => {
                if (response.data) {
                    return response && response.data;
                }
            })
            .catch(error => {
                const getCardDetailsError = new Error(`CardService.getCardDetails Error: ${error.message}`);
                console.error(getCardDetailsError.message);
                throw getCardDetailsError;
            });

    }
}
