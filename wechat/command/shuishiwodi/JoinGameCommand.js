const ICommand = require("../ICommand");
const gameMap = require("./gameMap");
const { findContactByName } = require("./utils");

class JoinGameCommand extends ICommand {
  constructor() {
    super();
  }
  async execute(message, bot) {
    const room = message.room();
    const contact = message.talker();
    // 获取游戏
    let game = gameMap.get(room.id);
    // 如果游戏不存在
    if (!game) {
      await message.say("游戏不存在，请先创建游戏");
      return;
    }
    // 非好友
    if (!(await findContactByName(bot, contact.name()))) {
      await message.say("您不是我的好友，无法进行游戏");
      return;
    }
    // 游戏已经开始
    if (game.status !== 0) {
      await message.say("游戏已经开始，请等待下一局");
      return;
    }
    // 加入游戏
    game.addPlayer(contact.name());
    await message.say("加入游戏成功");
  }
}

module.exports = JoinGameCommand;
