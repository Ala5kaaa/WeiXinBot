// 加入游戏命令
const ICommand = require("../ICommand");
const { isPlayerInGame, findContactByName } = require("./utils");
const gameMap = require("./gameMap");

class JoinGameCommand extends ICommand {
  constructor() {
    super();
  }

  async execute(message, bot) {
    const room = message.room();
    const contact = message.talker();
    // 获取游戏
    const game = gameMap.get(room.id);
    // 如果游戏不存在
    if (!game) {
      await message.say("游戏不存在，请先创建游戏");
      return;
    }

    // 非好友
    if (!(await findContactByName(bot, contact.name()))) {
      await message.say("您不是我的好友，无法加入游戏");
      return;
    }

    // 如果已经在游戏中
    if (isPlayerInGame(game,contact)) {
      await message.say("您已经在游戏中，请勿重复加入");
      return;
    }

    // 如果游戏已经开始
    if (game.status >= 1) {
      await message.say("游戏已经开始，无法加入");
      return;
    }

    await game.addPlayer(contact.name());
    await message.say("加入游戏成功，当前游戏人数：" + game.players.length);

    // 当游戏人数达到3人时，开始分牌
    if (game.players.length === 4) {
      game.initGame();

      // 私聊告诉每个玩家自己的牌
      for (let i = 0; i < game.players.length; i++) {
        const player = game.players[i];
        const contact = await findContactByName(bot, player.id);
        await contact.say("您的牌是：" + player.cards.join(","));
      }
      await message.say(
          "游戏开始，@" +
          game.players[game.currentPlayerIndex].id +
          "开始出牌"
      );
    }
  }
}

module.exports = JoinGameCommand;
