export default class Player {
    constructor(name, symbol) {
        this.name = name;
        this.symbol = symbol;
        this.points = 0;
    }


    addPoints() {
        this.points += 1;
    }
    getPoints() {
        return this.points;
    }
    getName() {
        return this.name;
    }
    getSymbol() {
        return this.symbol;
    }
}