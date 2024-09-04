const ICommand = require("../ICommand");
const {TwentyFourGame} = require("../../../towFour/twoFour");
const gameMap = require("./gameMap");

class OverTwoFourCommand extends ICommand {
    constructor() {
        super();
    }

    async execute(message, bot) {
        const room = message.room();
        gameMap.delete(room.id);
        await message.say("游戏结束");
    }

}

module.exports = OverTwoFourCommand;