const CommandHandler = require("../CommandHandler");
const DuCommand = require("../shudu/DuCommand");
const PlayShuDuCommand = require("../shudu/PlayShuDuCommand");
const ShuduCommandHandler = new CommandHandler();


function registerShuduCommand() {
    ShuduCommandHandler.registerCommand("数独", new DuCommand());
    ShuduCommandHandler.registerCommand("下", new PlayShuDuCommand());
}

// 根据message的内容，得到对应的命令
function getShuduCommand(contentTrim, talkMode) {
    // 暂时处理所有的消息都是聊天
    if (contentTrim.includes("数独")) {
        return '数独';
    }else if (contentTrim.includes("下")){
        return '下';
    }

}

module.exports = {
    registerShuduCommand,
    getShuduCommand,
    ShuduCommandHandler
}