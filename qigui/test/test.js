const {QIGuiGame} = require("../../qigui/game");
const {
    findContactByName,
    isPlayerInGame,
    showCards,
    getCards,
} = require("./utils");

const qi = new QIGuiGame();
qi.addPlayer(1);
qi.addPlayer(2);
qi.initGame();
console.log(qi.players[0].cards)
const crads = getCards("cc黑桃8");
console.log(crads)
qi.play(crads);
console.log(qi.players[0].cards)


function removeHuaSe(array) {
    return array.map(str => str.replace(new RegExp('♦', 'g'), '♦️')
        .replace(new RegExp('♣', 'g'), '♣️')
        .replace(new RegExp('♥', 'g'), '♥️')
        .replace(new RegExp('♠', 'g'), '♠️')
    );
}
