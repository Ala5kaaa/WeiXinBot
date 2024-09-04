const ICommand = require("../ICommand");
const {TwentyFourGame} = require("../../../towFour/twoFour");
const gameMap = require("./gameMap");

class CreateTwoFourCommand extends ICommand {
    constructor() {
        super();
    }

    async execute(message, bot) {
        const room = message.room();
        if (message.talker().name().startsWith("微信")) {
            return;
        }
        // 获取游戏
        let game = gameMap.get(room.id);
        // 如果游戏已经存在
        if (game) {
            await message.say("游戏已经存在，请直接游戏");
        } else {
            const twoFour = new TwentyFourGame();
            // 创建游戏
            gameMap.set(room.id, twoFour);
            twoFour.generateNumbers();
            // 发送消息
            await message.say(twoFour.printQuestion());
        }
    }
}

module.exports = CreateTwoFourCommand;
