// 通过名字查找联系人
async function findContactByName(bot,name) {
    const contact = await bot.Contact.find({name});
    return contact;
}

// 判断是否是正在游戏中的玩家
function isPlayerInGame(game,contact) {
    const name = contact.name();
    const players = game.players;
    const idMap = players.map((player) => player.id);
    return game && idMap.includes(name);
}

// 出牌阶段解析牌
function getCards(content) {
    let uppercaseContent = content.toUpperCase();
    uppercaseContent = uppercaseContent.replace(/c/gi, '').replace(/\s+/g, '');
    uppercaseContent = uppercaseContent.replace(/10/g, "X")
        .replace(/出/g, "")
        .replace(/方块/g, "♦")
        .replace(/梅花/g, "♣")
        .replace(/红桃/g, "♥")
        .replace(/黑桃/g, "♠")
        .replace(/[微笑]/g, "♦")
        .replace(/[撇嘴]/g, "♣")
        .replace(/[色]/g, "♥")
        .replace(/[发呆]/g, "♠");

    return groupStrings(uppercaseContent).map(str => str.replace(new RegExp('♦', 'g'), '♦️')
        .replace(new RegExp('♣', 'g'), '♣️')
        .replace(new RegExp('♥', 'g'), '♥️')
        .replace(new RegExp('♠', 'g'), '♠️'));

}

function groupStrings(str) {
    const groups = [];
    let currentGroup = '';

    for (let i = 0; i < str.length; i++) {
        if (str[i] === '♠' || str[i] === '♣' || str[i] === '♥' || str[i] === '♦') {
            if (i < str.length - 1) {
                currentGroup += str[i] + str[i + 1];
                i++; // Skip the next character since it's already added to the current group
            }
        } else {
            currentGroup += str[i];
        }
        groups.push(currentGroup);
        currentGroup = '';
    }

    return groups;
}

// 公布每个人剩余牌数
function showCards(game) {
    const players = game.players;
    let result = "";
    for (let i = 0; i < players.length; i++) {
        const player = players[i];
        result += player.id + "剩余牌数：" + player.cards.length + "  得分:" + player.score + "\n";
    }
    result += "剩余牌堆数：" + game.playerCards.length;
    return result;
}

// 通过message获取各种信息
function getInfo(message) {
    const room = message.room();
    const content = message.text();
    const contact = message.talker();
    const contentTrim = content.trim();
    return {
        room,
        content,
        contact,
        contentTrim,
    }
}

module.exports = {
    findContactByName,
    isPlayerInGame,
    getCards,
    showCards,
    getInfo,
}
