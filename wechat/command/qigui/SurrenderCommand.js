// 投降命令
const ICommand = require("../ICommand");
const fileUtil = require("../../../utils/fileUtils");
const { isPlayerInGame, findContactByName } = require("./utils");
const gameMap = require("./gameMap");

class SurrenderCommand extends ICommand {
  constructor() {
    super();
  }

  async execute( message, bot) {
    const room = message.room();
    const contact = message.talker();
    // 获取游戏
    const game = gameMap.get(room.id);
    // 如果游戏不存在
    if (!game) {
      await message.say("游戏不存在，无法投降");
      return;
    }

    // 非好友
    if (!(await findContactByName(bot, contact.name()))) {
      await message.say("您不是我的好友，无法进行游戏");
      return;
    }

    // 不在游戏中
    if (!isPlayerInGame(game,contact)) {
      await message.say("您不在游戏中，无法投降");
      return;
    }

    // 游戏不处于出牌阶段
    if (game.status !== 2) {
      await message.say("游戏不处于出牌阶段，无法投降");
      return;
    }

    // 获取当前玩家
    let player = game.getCurrentPlayer();
    //修复投降bug
    for (let i = 0; i < game.players.length; i++) {
      if (game.players[i].id === contact.name()) {
        player = game.players[i];
      }
    }

    // 投降
    let isLandlordWin = false;
    if (!player.isLandlord) {
      isLandlordWin = true;
    }
    for (let i = 0; i < game.players.length; i++) {
      const player = game.players[i];
      if (player.isLandlord === isLandlordWin) {
        fileUtil.recordResult(player.id, true);
      } else {
        fileUtil.recordResult(player.id, false);
      }
    }
    await message.say(player.id + "投降，游戏结束");
    await message.say(fileUtil.getWinRate());
    gameMap.delete(room.id);
  }
}

module.exports = SurrenderCommand;
