export default class CardService {
    constructor(axios) {
        this.axios = axios;
        this.favouriteRecipes = undefined;
        this.getCards = this.getCards.bind(this);
    }

    getCards() {
        // Make the axios call
        // Return them out via a promise...
        return this.axios.get('/api/products?size=20&fq=card_shop_id:1')
            .then(response => {
                if (response.data) {
                    //TODO: cache this somehow?
                    return response && response.data;
                }
            });
    }
}
