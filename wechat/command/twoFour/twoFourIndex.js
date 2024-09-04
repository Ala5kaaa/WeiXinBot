const CommandHandler = require("../CommandHandler");
const CreateTwoFourCommand = require("./CreateTwoFourCommand")
const PlayTwoFourCommand = require("./PlayTwoFourCommand")
const OverTwoFourCommand = require("./OverTwoFourCommand")
const FindAnimeCommand = require("./FindAnimeCommand")
const DrawCommand = require("./DrawCommand")
const MoYuCommand = require("./MoYuCommand")
const ReadWorldCommand = require("./ReadWorldCommand")
const KFCvFiftyCommand = require("./KFCvFiftyCommand")
const WifeCommand = require("./WifeCommand")
const AoJiaoCommand = require("./AoJiaoCommand")
const BaiduTiKuCommand = require("./BaiduTiKuCommand")
const SouGeCommand = require("./SouGeCommand")
const ChouXiangCommand = require("./ChouXiangCommand")
const SingleCommand = require("./SingleCommand")
const MeimeiCommand = require("./MeimeiCommand")
const TwoFourCommandHandler = new CommandHandler();

function registerTwoFourCommand() {
    TwoFourCommandHandler.registerCommand("24点", new CreateTwoFourCommand());
    TwoFourCommandHandler.registerCommand("回答", new PlayTwoFourCommand());
    TwoFourCommandHandler.registerCommand("结束", new OverTwoFourCommand());
    TwoFourCommandHandler.registerCommand("搜", new FindAnimeCommand());
    TwoFourCommandHandler.registerCommand("画", new DrawCommand());
    TwoFourCommandHandler.registerCommand("摸鱼日报",new MoYuCommand());
    TwoFourCommandHandler.registerCommand("读世界",new ReadWorldCommand());
	TwoFourCommandHandler.registerCommand("KFC",new KFCvFiftyCommand());
	TwoFourCommandHandler.registerCommand("发病",new WifeCommand());
	TwoFourCommandHandler.registerCommand("傲娇姐姐",new AoJiaoCommand());
	TwoFourCommandHandler.registerCommand("q",new BaiduTiKuCommand());
    TwoFourCommandHandler.registerCommand("搜歌",new SouGeCommand());
	TwoFourCommandHandler.registerCommand("抽象",new ChouXiangCommand());
    TwoFourCommandHandler.registerCommand("单选",new SingleCommand());
	TwoFourCommandHandler.registerCommand("妹妹",new MeimeiCommand());
}

function getTwoFourCommand(contentTrim, talkMode) {
    if (contentTrim.startsWith("24点")) {
        return '24点';
    } else if (contentTrim.startsWith("结束")) {
        return '结束';
    }else if (contentTrim.startsWith("搜歌") || contentTrim.startsWith("选歌")) {
        return '搜歌';
    } else if (contentTrim.startsWith("搜番")) {
        return '搜';
    } else if (contentTrim.startsWith("画")) {
        return '画';
    }else if (contentTrim.startsWith("摸鱼日报")) {
        return '摸鱼日报';
    } else if (contentTrim.startsWith("60秒")) {
        return '读世界';
    } else if (contentTrim.startsWith("肯德基")) {
        return 'KFC';
    } else if (contentTrim.startsWith("发病")) {
        return '发病';
    } else if (contentTrim.startsWith("姐姐")) {
        return '傲娇姐姐';
    } else if (contentTrim.startsWith("q")) {
        return 'q';
    } else if (contentTrim.startsWith("抽象")) {
        return '抽象';
    } else if (contentTrim.startsWith("单选") || contentTrim.startsWith("答")) {
        return '单选';
    } else if (contentTrim.startsWith("妹妹")) {
		return '妹妹';
	} else {
        return '回答';
    }
}

module.exports = {
    registerTwoFourCommand,
    getTwoFourCommand,
    TwoFourCommandHandler
}
