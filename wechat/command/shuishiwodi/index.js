const CommandHandler = require("../CommandHandler");
const ShuishiwodiCommandHandler = new CommandHandler();
const CreateGameCommand = require("./CreateGameCommand");
const JoinGameCommand = require("./JoinGameCommand");

function registerShuishiwodiCommand() {
  // 谁是卧底
  ShuishiwodiCommandHandler.registerCommand(
    "谁是卧底",
    new CreateGameCommand()
  );
  // 加入
  ShuishiwodiCommandHandler.registerCommand("加入", new JoinGameCommand());
  // 发言
  // 投票
  // 开始
  // 胜率榜
}

function getShuishiwodiCommand(contentTrim, talkMode) {
  return "回答";
}
