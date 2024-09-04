const ICommand = require("../ICommand");
const { ChatGpt } = require("../../../gpt/gpt");
const GPT = new ChatGpt();
const AllMessage = require("../../../allMessage");

class SummarizeCommand extends ICommand {
  constructor() {
    super();
  }

  async execute(message, bot) {
    // 如果是微信团队的消息，不做处理
    if (message.talker().name().startsWith("微信")) {
      return;
    }

    let id = message.talker().name();
    if (message.room()) {
      id = message.room().id;
    }
    const allMessage = AllMessage.getMessageById(id);
    const prompt = `
    你是一个中文的群聊总结的助手，你可以为一个微信的群聊记录，提取并总结每个时间段大家在重点讨论的话题内容。
    
    请帮我将给出的群聊内容总结成一个今日的群聊报告，包含不多于10个的话题的总结（如果还有更多话题，可以在后面简单补充）。每个话题包含以下内容：
    - 话题名(50字以内，带序号1️⃣2️⃣3️⃣，同时附带热度，以🔥数量表示）
    - 参与者(不超过5个人，将重复的人名去重)
    - 时间段(从几点到几点)
    - 过程(50到200字左右）
    - 评价(50字以下)
    - 分割线： ------------
    
    另外有以下要求：
    1. 每个话题结束使用 ------------ 分割
    2. 使用中文冒号
    3. 无需大标题
    4. 开始给出本群讨论风格的整体评价，例如活跃、太水、太黄、太暴力、话题不集中、无聊诸如此类
    
    最后总结下今日最活跃的前五个发言者。
    
    以下是群聊内容：
    ${JSON.stringify(allMessage)}
    `;

    // 获取GPT回复
    const gptResponse = await GPT.post(prompt, id);
    // 发送消息
    await message.say(gptResponse);
  }
}

module.exports = SummarizeCommand;
