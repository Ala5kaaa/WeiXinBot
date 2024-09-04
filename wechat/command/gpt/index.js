const CommandHandler = require("../CommandHandler");
const GptCommandHandler = new CommandHandler();
const GptCommand = require("./ChatCommand");
const SummarizeCommand = require("./SummarizeCommand");

function registerGptCommand() {
  GptCommandHandler.registerCommand("聊天", new GptCommand());
  GptCommandHandler.registerCommand("总结", new SummarizeCommand());
}

// 根据message的内容，得到对应的命令
function getGptCommand(contentTrim) {
  if (contentTrim.includes("聊天总结")) {
    return "总结";
  } else {
    return "聊天";
  }
}

module.exports = {
  registerGptCommand,
  getGptCommand,
  GptCommandHandler,
};
