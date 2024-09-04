// 胜率榜命令
const ICommand = require("./ICommand");
const fileUtil = require("../../../utils/fileUtils");

class MoyubangCommand extends ICommand {
    constructor() {
        super();
    }

    async execute({message}) {
        const list = fileUtil.getMoyuRate();
        if (!list) {
            await message.say("暂无摸鱼榜");
            return;
        }else {
            await message.say(list);
        }
    }
}

module.exports = MoyubangCommand;
