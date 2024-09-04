const ICommand = require("../ICommand");
const {SudokuGenerator} = require("../../../shudu/game");
const gameMap = require("./gameMap");

class DuCommand extends ICommand {
    constructor() {
        super();
    }

    async execute(message, bot) {
        const room = message.room();
        const contact = message.talker();
        // 获取消息内容
        const content = await message.mentionText();
        const contentTrim = content.trim();
        if (contentTrim === "") {
            return;
        }
        if (message.talker().name().startsWith("微信")) {
            return;
        }
        // 获取游戏
        let game = gameMap.get(room.id);
        // 如果游戏已经存在
        if (game) {
            await message.say("游戏已经存在，请直接游戏");
        }else {
            const du = new SudokuGenerator();
            // 创建游戏
            gameMap.set(room.id,du);
            // 发送消息
            await message.say( du.generateSudoku());
        }
    }
}

module.exports = DuCommand;
