export default class CardService {
    constructor(axios) {
        this.axios = axios;
        this.favouriteRecipes = undefined;
        this.getCards = this.getCards.bind(this);
    }

    getCards () {
        // Make the axios call

        // Parse the cards in some way

        // Return them out via a promise...
    }
}
