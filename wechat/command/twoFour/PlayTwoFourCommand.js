const ICommand = require("../ICommand");
const {TwentyFourGame} = require("../../../towFour/twoFour");
const gameMap = require("./gameMap");

class PlayTwoFourCommandCommand extends ICommand {
    constructor() {
        super();
    }

    async execute(message, bot) {
        const room = message.room();
        let game = gameMap.get(room.id);
        // 获取消息内容
        const content = await message.mentionText();
        const contentTrim = content.trim();

        if (!game) {
            await message.say("24点游戏还没开始");
        } else {
            if (game.checkAnswer(contentTrim).includes("恭喜你")) {
                await message.say("恭喜你，答对了");
                gameMap.delete(room.id)

                // 重新发新的题目
                const twoFour = new TwentyFourGame();
                // 创建游戏
                gameMap.set(room.id, twoFour);
                twoFour.generateNumbers();
                // 发送消息
                await message.say(twoFour.printQuestion());
            } else if(game.checkAnswer(contentTrim).includes("格式错误")) {
                await message.say("格式错误，请重新输入");
            }else {
                await message.say("菜就多练，这都错了");
            }
        }
    }
}

module.exports = PlayTwoFourCommandCommand;