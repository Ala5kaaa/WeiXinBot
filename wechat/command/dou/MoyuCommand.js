const ICommand = require("./ICommand");
const {
    findContactByName,
    isPlayerInGame,
    showCards,
    getCards,
} = require("./utils");
const fileUtil = require("../../../utils/fileUtils");

class MoyuCommand extends ICommand {
    constructor() {
        super();
    }

    async execute({gameMap, room, contact, message, bot}) {
        console.log("摸鱼")
        fileUtil.recordMoyu(contact.name(),true)

    }
}

module.exports = MoyuCommand;