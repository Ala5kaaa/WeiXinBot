const CommandHandler = require("../CommandHandler");
const CreateGameCommand = require("./CreateGameCommand");
const JoinGameCommand = require("./JoinGameCommand");
const BeLandlordsCommand = require("./BeLandlordsCommand");
const DontBeLandlordsCommand = require("./DontBeLandlordsCommand");
const PlayCardCommand = require("./PlayCardCommand");
const ListCommand = require("./ListCommand");
const GameOverCommand = require("./GameOverCommand");
const SurrenderCommand = require("./SurrenderCommand");
const RankListCommand = require("./RankListCommand");
const RankCommand = require("./RankCommand");
const DouCommandHandler = new CommandHandler();
const { TALK_MODE } = require("../../enum");

function registerDouCommand() {
  DouCommandHandler.registerCommand("斗地主", new CreateGameCommand());
  DouCommandHandler.registerCommand("上桌", new JoinGameCommand());
  DouCommandHandler.registerCommand("抢地主", new BeLandlordsCommand());
  DouCommandHandler.registerCommand("不抢", new DontBeLandlordsCommand());
  DouCommandHandler.registerCommand("出牌", new PlayCardCommand());
  DouCommandHandler.registerCommand("胜率榜", new ListCommand());
  DouCommandHandler.registerCommand("结束", new GameOverCommand());
  DouCommandHandler.registerCommand("投降", new SurrenderCommand());
  DouCommandHandler.registerCommand("排位榜", new RankListCommand());
  DouCommandHandler.registerCommand("段位", new RankCommand());
}

// 根据message的内容，得到对应的命令
function getDouCommand(contentTrim, talkMode) {
  let commandName = "";
  if (talkMode === TALK_MODE.GROUP_AT) {
    if (contentTrim.includes("胜率榜")) {
      commandName = "胜率榜";
    } else if (contentTrim.includes("结束")) {
      commandName = "结束";
    } else if (contentTrim === "投降") {
      commandName = "投降";
    } else if (
      contentTrim === "抢" ||
      contentTrim === "抢地主" ||
      contentTrim === "y"
    ) {
      commandName = "抢地主";
    } else if (
      contentTrim === "不" ||
      contentTrim === "不抢" ||
      contentTrim === "n"
    ) {
      commandName = "不抢";
    } else if (contentTrim.includes("胜率榜")) {
      commandName = "胜率榜";
    } else if (contentTrim.includes("斗地主")) {
      commandName = "斗地主";
    } else if (contentTrim.includes("上桌")) {
      commandName = "上桌";
    } else if (contentTrim.includes("段位")) {
      commandName = "段位";
    } else if (contentTrim.includes("排位榜")) {
      commandName = "排位榜";
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
  registerDouCommand,
  DouCommandHandler,
  getDouCommand,
};
