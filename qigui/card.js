// 生成一副扑克牌
function createDeck() {
    const suits = ["♦️", "♣️", "♥️", "♠️"];
    const ranks = [
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "X",
        "J",
        "Q",
        "K",
        "A",
    ];
    const jokers = ["S", "B"];
    const deck = [];

    for (const suit of suits) {
        for (const rank of ranks) {
            deck.push(suit + rank);
        }
    }

    for (const joker of jokers) {
        deck.push(joker);
    }
    return deck;
}

// 洗牌
function shuffle(array) {
    const newArray = [...array];
    let m = newArray.length;
    while (m) {
        const i = Math.floor(Math.random() * m--);
        [newArray[m], newArray[i]] = [newArray[i], newArray[m]];
    }
    return newArray;
}

// 排序，是否倒序
function sortCards(cards, reverse = false) {
    if (reverse) {
        return cards.sort((a, b) => {
            return getCardValue(a) - getCardValue(b);
        });
    } else {
        return cards.sort((a, b) => {
            return getCardValue(b) - getCardValue(a);
        });
    }
}


function getCardValue(card) {
    const cardValues = {
        4: 0,
        6: 100,
        8: 200,
        9: 300,
        X: 400,
        J: 500,
        Q: 600,
        K: 700,
        A: 800,
        3: 900,
        2: 1000,
        5: 1100,
        S: 1200,
        B: 1300,
        7: 1400,
    };
    let value = 0;
    if (card.includes('♦️')) {          //计算大小
        value += 1;
       card = card.replace(new RegExp('♦️', 'g'), '');
    } else if (card.includes('♣️')) {
        value += 2;
        card = card.replace(new RegExp('♣️', 'g'), '');
    } else if (card.includes('♥️')) {
        value += 3;
        card = card.replace(new RegExp('♥️', 'g'), '');
    } else if (card.includes('♠️')) {
        value += 4;
        card = card.replace(new RegExp('♠️', 'g'), '');
    }
    return cardValues[card] + value;
}

// 定义牌型枚举
const cardTypes = {
    BOMB: "BOMB", // 炸弹
    SINGLE: "SINGLE", // 单张
    PAIR: "PAIR", // 对子
    TRIPLE: "TRIPLE", // 三张
};

function removeHuaSe(array) {
    return array.map(str => str.replace(new RegExp('♦️', 'g'), '')
        .replace(new RegExp('♣️', 'g'), '')
        .replace(new RegExp('♥️', 'g'), '')
        .replace(new RegExp('♠️', 'g'), '')
    );
}

// 判断是否为对子
function isPair(cards) {
    cards = removeHuaSe(cards);
    return cards.length === 2 && (cards[0] === cards[1]
        || (cards.includes("S") && cards.includes("B")));
}

// 判断是否为炸弹
function isBomb(cards) {
    cards = removeHuaSe(cards);
    if (cards.length !== 4) {
        return false;
    }
    const cardValueSet = new Set(cards);
    if (cardValueSet.size !== 1) {
        return false;
    }
    return true;
}

// 判断是否为三张
function isTriple(cards) {
    cards = removeHuaSe(cards);
    if (cards.length !== 3) {
        return false;
    }
    const cardValueSet = new Set(cards);
    if (cardValueSet.size !== 1) {
        return false;
    }
    return true;
}


// 判断牌型
function checkCardType(cards) {
    if (isBomb(cards)) {
        return cardTypes.BOMB;
    } else if (isTriple(cards)) {
        return cardTypes.TRIPLE;
    } else if (isPair(cards)) {
        return cardTypes.PAIR;
    } else if (cards.length === 1) {
        return cardTypes.SINGLE;
    }
    return null;
}

// 比较牌的大小，返回-1表示cards1小于cards2，返回1表示cards1大于cards2，返回null表示牌型不同无法比较，返回0表示牌型相同但是牌的大小相同
/**
 *
 * @param cards1
 * @param cards2
 */
function compareCards(cards1, cards2) {
    console.log(cards1)
    if (cards2 === null) {
        return 1;
    }
    const type1 = checkCardType(cards1);
    const type2 = checkCardType(cards2);

    if (type1 !== type2) {
        return null;
    }

    if (type1 === cardTypes.BOMB && type2 === cardTypes.BOMB) {
        return getCardValue(cards1[0]) - getCardValue(cards2[0]);
    }

    if (type1 === cardTypes.SINGLE) {
        return getCardValue(cards1[0]) - getCardValue(cards2[0]);
    }

    if (type1 === cardTypes.PAIR) {
        return getCardValue(cards1[0]) - getCardValue(cards2[0]);
    }

    if (type1 === cardTypes.TRIPLE) {
        return getCardValue(cards1[0]) - getCardValue(cards2[0]);
    }
    return null;
}

// 检查牌是否合法
function isValidCards(cards) {
    const type = checkCardType(cards);
    return type !== null;
}

// 导出
module.exports = {
    createDeck,
    shuffle,
    sortCards,
    checkCardType,
    cardTypes,
    compareCards,
    isValidCards,
};
