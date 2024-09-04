const ICommand = require("../ICommand");
const {FileBox} = require('file-box');
class MoYuCommand extends ICommand {
    constructor() {
        super();
        this.apiUrl = 'https://api.52vmy.cn/api/wl/moyu';
    }

    async execute(message, bot) {
        const imageUrl = this.apiUrl;
        const fileBox = FileBox.fromUrl(imageUrl, 'moyu.jpg');
        // 发送图片
        await message.say(fileBox);
    }
}

module.exports = MoYuCommand;
