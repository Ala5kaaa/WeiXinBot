const {
    createDeck,
    shuffle,
    checkCardType,
    compareCards,
} = require("./card");
const {Player} = require("./player");

// 游戏类
class QIGuiGame {
    constructor() {
        this.reset();
    }

    // 初始化游戏
    initGame() {
        this.playerCards = shuffle(this.deck);
        this.drawCards();
        this.score = 0; //总分数
        this.status = 2;
    }

    drawCards() {
        // 发牌给玩家
        for (let i = 0; i < this.players.length; i++) {
            while (this.players[i].cards.length < 5 && this.playerCards.length > 0) {
                this.players[i].draw(this.playerCards[0]);
                this.playerCards.shift();
            }
        }
    }

    // 添加玩家
    addPlayer(id) {
        // 超过三人，不能再加入
        if (this.players.length >= 4) {
            return;
        }
        const player = new Player(id);
        this.players.push(player);
    }

    startPlay() {
        this.status = 2;
    }

    // 获取当前玩家
    getCurrentPlayer() {
        return this.players[this.currentPlayerIndex];
    }


    // 出牌
    play(cards) {
        const currentPlayer = this.players[this.currentPlayerIndex];
        if (cards.length !== 0) {
            const cardType = checkCardType(cards);
            if (!cardType) {
                return false;
            }
            if (this.lastPlay) {
                const result = compareCards(cards, this.lastPlay);
                if (result <= 0 || result === null) {
                    return false;
                }
            }
            // 确定玩家真的有这些牌，有这么多张
            const cardsExist = cards.every(card => currentPlayer.cards.includes(card));

            if (!cardsExist) {
                return false;
            }


            // 计算score
            cards.forEach(card => {
                if (card.includes("5")) {
                    this.score += 5;
                } else if (card.includes("X") || card.includes("K")) {
                    this.score += 10;
                }
            })


            currentPlayer.play(cards);
            this.lastPlay = cards;
            // 检查游戏是否结束
            this.checkGameOver(currentPlayer);

            // 未结束，继续下一玩家出牌
            if (!this.gameOver) {
                this.nextPlayer();
            }
            this.passCount = 0;
        } else {
            if (!this.lastPlay) {
                return false;
            }
            this.pass();
        }
        return true;
    }

    // 当前玩家不出
    pass() {
        this.passCount++;
        // 如果连续所有其他玩家
        if (this.passCount === this.players.length - 1) {
            this.passCount = 0;
            this.lastPlay = null;
            this.nextPlayer();
            this.getCurrentPlayer().addScore(this.score); //加分数
            this.drawCards();
            this.score = 0;
            return;
        }
        this.nextPlayer();
    }

    nextPlayer() {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    }

    // 检查游戏是否结束
    checkGameOver(player) {
        console.log("length:" + player.cards.length)
        if (player.cards.length === 0 && this.playerCards.length === 0) {

            for (let i = 0; i < this.players.length; i++) {
                const player = this.players[i];
                player.cards.forEach(card => {
                    if (card.includes("5")) {
                        this.score += 5;
                    } else if (card.includes("X") || card.includes("K")) {
                        this.score += 10;
                    }
                })
            }
            this.getCurrentPlayer().score += this.score;
            this.score = 0;
            this.gameOver = true;
        }
    }

    // 重置游戏
    reset() {
        this.status = 0;
        this.deck = createDeck(); // 创建一副牌
        this.players = []; // 创建玩家
        this.currentPlayerIndex = 0; // 当前出牌的玩家索引
        this.lastPlay = null; // 上一次出的牌
        this.gameOver = false; // 游戏结束标志
        this.winner = null; // 赢家
        this.bottomCards = null; // 底牌

        // 当前跳过的次数
        this.passCount = 0;
    }
}

module.exports = {QIGuiGame};
