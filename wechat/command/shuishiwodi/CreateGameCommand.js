// 创建游戏指令
const ICommand = require("../ICommand");
const gameMap = require("./gameMap");
const { ShuishiwodiGame } = require("../../../shuishiwodi/game");
const { findContactByName } = require("./utils");

class CreateGameCommand extends ICommand {
  constructor() {
    super();
  }
  async execute(message, bot) {
    const room = message.room();
    const contact = message.talker();
    // 获取游戏
    let game = gameMap.get(room.id);
    // 如果游戏已经存在
    if (game) {
      await message.say("游戏已经存在，请加入游戏");
      return;
    }
    // 非好友
    if (!(await findContactByName(bot, contact.name()))) {
      await message.say("您不是我的好友，无法进行游戏");
      return;
    }
    // 创建游戏
    gameMap.set(room.id, new ShuishiwodiGame());
    game = gameMap.get(room.id);
    game.addPlayer(contact.name());
    await message.say("欢迎来到谁是卧底");
  }
}

module.exports = CreateGameCommand;
