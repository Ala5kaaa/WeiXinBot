const { MODE, TALK_MODE } = require("../enum");
const { DouCommandHandler, getDouCommand } = require("../command/dou");
const { GptCommandHandler, getGptCommand } = require("../command/gpt");
const allMessage = require("../../allMessage");
const {
  ShuduCommandHandler,
  getShuduCommand,
} = require("../command/shudu/shuduIndex");
const {
  TwoFourCommandHandler,
  getTwoFourCommand,
} = require("../command/twoFour/twoFourIndex");
const {
  QiGuiCommandHandler,
  getQiGuiCommand,
} = require("../command/qigui/index");
const commands = {
  [MODE.DOU_DI_ZHU]: {
    handler: DouCommandHandler,
    getCommand: getDouCommand,
    // 1群聊 ，2私聊，3群聊@我
    type: [TALK_MODE.GROUP, TALK_MODE.GROUP_AT],
  },
  [MODE.GPT]: {
    handler: GptCommandHandler,
    getCommand: getGptCommand,
    type: [TALK_MODE.GROUP_AT, TALK_MODE.PRIVATE],
  },
  [MODE.SHU_DU]: {
    handler: ShuduCommandHandler,
    getCommand: getShuduCommand,
    type: [TALK_MODE.GROUP_AT, TALK_MODE.PRIVATE],
  },
  [MODE.TWO_FOUR]: {
    handler: TwoFourCommandHandler,
    getCommand: getTwoFourCommand,
    type: [TALK_MODE.GROUP_AT, TALK_MODE.PRIVATE],
  },
  [MODE.Qi_GUI]: {
    handler: QiGuiCommandHandler,
    getCommand: getQiGuiCommand,
    type: [TALK_MODE.GROUP, TALK_MODE.GROUP_AT],
  },
};

const MODE_TEXT = {
  "7鬼": MODE.Qi_GUI,
  斗地主: MODE.DOU_DI_ZHU,
  数独: MODE.SHU_DU,
  gpt: MODE.GPT,
  "24点": MODE.TWO_FOUR,
};

// 会话类

class Session {
  constructor() {
    // 当前会话模式，默认为gpt
    this.mode = MODE.GPT;
  }

  // 会话处理
  async handle(message, bot) {
    // 如果是机器人自己发的消息，不做处理
    if (message.self()) {
      return;
    }
    // 如果是微信团队的消息，不做处理
    if (message.talker().name().startsWith("微信")) {
      return;
    }

    const isModeSwitch = await this.isModeSwitch(message);
    const talkMode = await this.getGroupMode(message);
    if (isModeSwitch) {
      return;
    } else {
      const curCommand = commands[this.mode];
      // 判断当前模式是否支持当前聊天模式
      const type = curCommand.type;
      if (!type.includes(talkMode)) {
        return;
      }
      const content = await message.mentionText();
      const contentTrim = content.trim();
      const command = curCommand.getCommand(contentTrim, talkMode);
      if (command) {
        const commandHandler = curCommand.handler;
        commandHandler.handle(command, message, bot);
      }
    }
  }

  //判断是否模式切换
  async isModeSwitch(message) {
    const content = await message.mentionText();
    const contentTrim = content.trim();
    // 是否群聊
    const room = message.room();
    // 是否艾特机器人
    const mentionSelf = await message.mentionSelf();
    // 群聊里需要艾特机器人才能切换模式，私聊不需要
    if (room && !mentionSelf) {
      return false;
    }

    if (contentTrim.startsWith("#")) {
      const modeText = contentTrim.substring(1);
      if (MODE_TEXT[modeText]) {
        const mode = MODE_TEXT[modeText];
        const command = commands[mode];
        const talkMode = await this.getGroupMode(message);
        if (!command.type.includes(talkMode)) {
          await message.say("当前聊天方式不支持" + modeText + "模式");
          return true;
        }
        this.mode = mode;
        await message.say("已经切换到" + modeText + "模式");
        return true;
      } else if (modeText === "help") {
        const modeList = Object.keys(MODE_TEXT).join("\n");
        await message.say("支持的模式有：\n" + modeList);
        return true;
      } else if (modeText === "退出" && this.mode !== MODE.GPT) {
        // 默认退回gpt模式
        this.mode = MODE.GPT;
        await message.say("退出当前模式成功，回到gpt模式");
        return true;
      } else if (modeText === "退出" && this.mode === MODE.GPT) {
        await message.say("gpt模式不能退出");
        return true;
      }
      await message.say("模式不存在");
      return true;
    } else {
      return false;
    }
  }

  // 获取群聊模式
  async getGroupMode(message) {
    const room = message.room();
    if (room) {
      const mentionSelf = await message.mentionSelf();
      if (mentionSelf) {
        return TALK_MODE.GROUP_AT;
      } else {
        return TALK_MODE.GROUP;
      }
    } else {
      return TALK_MODE.PRIVATE;
    }
  }
}

module.exports = {
  Session,
};
