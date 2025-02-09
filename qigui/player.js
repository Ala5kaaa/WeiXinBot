const {sortCards} = require('./card');

// 玩家类
class Player {
    constructor(id) {
        this.id = id; // 玩家ID
        this.cards = []; // 玩家手中的牌
        this.score = 0; //分数
    }

    addScore(score) {
        this.score += score;
    }

    // 玩家摸牌
    draw(cards) {
        this.cards.push(cards);
        sortCards(this.cards);
    }

    // 出牌
    play(cards) {
        // 从玩家手中移除出的牌
        for (let i = 0; i < cards.length; i++) {
            const index = this.cards.indexOf(cards[i]);
            this.cards.splice(index, 1);
        }
    }
}

module.exports = {Player};
