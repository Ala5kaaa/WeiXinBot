const ICommand = require("../ICommand");
const {SudokuGenerator} = require("../../../shudu/game");
const gameMap = require("./gameMap");

class PlayShuDuCommandCommand extends ICommand {
    constructor() {
        super();
    }
    async execute(message, bot) {
        const room = message.room();
        let game = gameMap.get(room.id);
        // 如果游戏已经存在
        if (!game) {
            await message.say("数独游戏还没开始");
        }else {
            await message.say(game.setCell(1,1,1));
        }
    }
}

module.exports = PlayShuDuCommandCommand;