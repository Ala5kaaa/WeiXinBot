// 出牌or跳过命令
const ICommand = require("../ICommand");
const {
    findContactByName,
    isPlayerInGame,
    showCards,
    getCards,
} = require("./utils");
const fileUtil = require("../../../utils/fileUtils");
const gameMap = require("./gameMap");

class PlayCardCommand extends ICommand {
    constructor(at) {
        super(at);
    }

    async execute(message, bot) {
        const room = message.room();
        const contact = message.talker();
        // 获取游戏
        const game = gameMap.get(room.id);
        // 如果游戏不存在
        if (!game) {
            await message.say("游戏不存在，请创建游戏");
            return;
        }

        // 非好友
        if (!(await findContactByName(bot, contact.name()))) {
            await message.say("您不是我的好友，无法进行游戏");
            return;
        }

        // 不在游戏中
        if (!isPlayerInGame(game, contact)) {
            await message.say("您不在游戏中，请先加入游戏");
            return;
        }

        // 游戏不处于出牌阶段
        if (game.status !== 2) {
            await message.say("游戏不处于出牌阶段，不能出牌");
            return;
        }
        const currentPlayer = game.getCurrentPlayer();

        // 未到当前玩家出牌
        if (currentPlayer.id !== contact.name()) {
            await message.say("未到您出牌");
            return;
        }
        const content = await message.mentionText();
        const contentTrim = content.trim();

        // 跳过
        if (
            contentTrim.includes("跳过") ||
            contentTrim.includes("过") ||
            contentTrim.includes("p")
        ) {
            await this.pass(game, message, bot);
            return;
        }
        await this.paly(contentTrim, game, message, currentPlayer, room, contact);
    }

    // 跳过逻辑
    async pass(game, message, bot) {
        // 获取当前玩家
        const player = game.getCurrentPlayer();
        // 跳过
        game.play([]);
        const showCardsResult = showCards(game);
        // 通知所有玩家
        await message.say(
            player.id +
            "跳过，" +
            game.getCurrentPlayer().id +
            "请出牌\n" +
            showCardsResult
        );

        // 私聊告诉每个玩家自己的牌
        for (let i = 0; i < game.players.length; i++) {
            const player = game.players[i];
            const contact = await findContactByName(bot, player.id);
            await contact.say("您的牌是：" + player.cards.join(","));
        }

    }

    //出牌逻辑
    async paly(contentTrim, game, message, player, room, contact) {
        const cards = getCards(contentTrim);
        // 判断是否符合规则
        if (game.play(cards)) {
            // 保存上一次出的牌
            game.lastPlay = cards;
            // 通知所有玩家
            await message.say(player.id + "出牌：" + cards);
            // 判断是否出完牌
            if (game.gameOver) {
                await message.say(
                    game.getCurrentPlayer().id +
                    "出完牌了，游戏结束，"
                );
                await message.say(showCards(game)); //显示最终的分数
                gameMap.delete(room.id);
                await message.say(
                    fileUtil.getWinRate() +
                    "\n" +
                    "本次7鬼523结束" +
                    "\n" +
                    "请重新开始游戏"
                );
                return;
            }
            // 通知当前玩家剩余的牌
            await contact.say("您的牌是：" + player.cards.join(","));
            const showCardsResult = showCards(game);
            // 通知下一个玩家出牌
            await message.say(
                game.getCurrentPlayer().id + "请出牌\n" + showCardsResult
            );
        } else {
            await message.say("出牌不符合规则");
        }
    }
}

module.exports = PlayCardCommand;
