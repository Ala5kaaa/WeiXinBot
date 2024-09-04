const ICommand = require("../ICommand");
const { ChatGpt } = require("../../../gpt/gpt");
const GPT = new ChatGpt();

class ChatCommand extends ICommand {
    constructor() {
        super();
    }

    async execute(message, bot) {
        // 如果是微信团队的消息，不做处理
        if (message.talker().name().startsWith("微信")) {
            return;
        }
        // 获取消息内容
        const content = await message.mentionText();
        const contentTrim = content.trim();
        if (contentTrim === "") {
            return;
        }
        let id = message.talker().name();
        if (message.room()) {
            id = message.room().id;
        }

        // 获取GPT回复
        const gptResponse = await GPT.post(contentTrim, id);
        // 发送消息
        await message.say(gptResponse);
    }
}

module.exports = ChatCommand;
