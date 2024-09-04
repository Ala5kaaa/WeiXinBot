// 排位信息命令
const ICommand = require("../ICommand");
const rankHelper = require("./helper/RankHelper");

class RankCommand extends ICommand {
  constructor() {
    super();
  }

  async execute(message) {
    const contact = message.talker();
    const name = contact.name();
    const rank = rankHelper.getRank(name);
    await message.say(
      `您的斗地主段位为：${rank.rank}, 当前积分：${rank.points}, 掉分保护卡数量：${rank.protectionCardCount}`
    );
  }
}

module.exports = RankCommand;
