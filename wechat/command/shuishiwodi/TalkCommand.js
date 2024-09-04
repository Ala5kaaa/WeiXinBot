const ICommand = require("../ICommand");
const gameMap = require("./gameMap");

class TalkCommand extends ICommand {
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
    // 游戏已经开始
    if (game.status !== 1) {
      await message.say("游戏还未开始，请等待");
      return;
    }
    // 当前玩家不是发言玩家
    if (game.players[game.currentPlayerIndex].id !== contact.name()) {
      await message.say("还未轮到你发言");
    }
    // 发言
    await message.say("发言");
  }
}
