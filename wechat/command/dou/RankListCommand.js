// 排位榜命令
const ICommand = require("../ICommand");
const rankHelper = require("./helper/RankHelper");

class RankListCommand extends ICommand {
  constructor() {
    super();
  }

  async execute(message) {
    const msg = rankHelper.getRankListMsg();
    await message.say(msg);
  }
}

module.exports = RankListCommand;
