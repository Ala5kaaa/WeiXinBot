const CommandHandler = require("../CommandHandler");
const CreateGameCommand = require("./CreateGameCommand");
const JoinGameCommand = require("./JoinGameCommand");
const StartCommand = require("./StartCommand");
const PlayCardCommand = require("./PlayCardCommand");
const ListCommand = require("./ListCommand");
const GameOverCommand = require("./GameOverCommand");
const QiGuiCommandHandler = new CommandHandler();
const {TALK_MODE} = require("../../enum");

function registerQiGuiCommand() {
    QiGuiCommandHandler.registerCommand("7鬼", new CreateGameCommand());
    QiGuiCommandHandler.registerCommand("上桌", new JoinGameCommand());
    QiGuiCommandHandler.registerCommand("出牌", new PlayCardCommand());
    QiGuiCommandHandler.registerCommand("胜率榜", new ListCommand());
    QiGuiCommandHandler.registerCommand("结束", new GameOverCommand());
    QiGuiCommandHandler.registerCommand("开始", new StartCommand());
}

// 根据message的内容，得到对应的命令
function getQiGuiCommand(contentTrim, talkMode) {
    let commandName = "";
    if (talkMode === TALK_MODE.GROUP_AT) {
        if (contentTrim.includes("胜率榜")) {
            commandName = "胜率榜";
        } else if (contentTrim.includes("结束")) {
            commandName = "结束";
        } else if (contentTrim.includes("7鬼")) {
            commandName = "7鬼";
        } else if (contentTrim.includes("上桌")) {
            commandName = "上桌";
        } else if (contentTrim.includes("开始")) {
            commandName = "开始";
        } else {
            commandName = "出牌";
        }
    } else if (talkMode === TALK_MODE.GROUP) {
        if (contentTrim.substring(0, 2) === "cc") {
            commandName = "出牌";
        }
    }
    return commandName;
}

module.exports = {
    registerQiGuiCommand,
    QiGuiCommandHandler,
    getQiGuiCommand,
};
