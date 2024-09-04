const {
    registerDouCommand,
} = require("./command/dou/index");
const {
    registerGptCommand,
} = require("./command/gpt/index");
const {
    registerShuduCommand,
} = require("./command/shudu/shuduIndex");
const {
    registerTwoFourCommand,
} = require("./command/twoFour/twoFourIndex");
const {
    registerQiGuiCommand,
} = require("./command/qigui/index");
const {Session} = require("./session/index");

// 会话缓存
const sessions = {};


class Wechat {
  constructor(message, bot) {
    this.name = 'Wechat';
    this.message = message;
    this.bot = bot;
    // 会话对应指令及处理集
    this.init();
  }
  init() {
    // 注册指令
    registerDouCommand();
      registerGptCommand();
      registerShuduCommand();
      registerTwoFourCommand();
      registerQiGuiCommand();
  }

  // 获取key
    getKey(message) {
        const room = message.room();
        const contact = message.talker();
        if (room) {
            return room.id;
        } else {
            return contact.name();
        }
    }

  // 获取会话
    getSession() {
        const message = this.message;
        const bot = this.bot;
      // 能否从缓存中获取会话
        const key = this.getKey(message);
        let session = sessions[key];
        if (!session) {
            session = new Session(message,bot);
            sessions[key] = session;
        } else {
            session = sessions[key];
        }
        return session;
    }

}

module.exports = {
    Wechat,
    sessions
}
