const { WechatyBuilder } = require("wechaty");
const qrTerm = require("qrcode-terminal");
const { Wechat } = require("./wechat/index");
const allMessage = require("./allMessage");

const bot = WechatyBuilder.build({
  name: "doudizhu",
});

bot
  .on("scan", (qrcode, status) => {
    qrTerm.generate(qrcode, { small: true });
  })
  .on("login", (user) => {
    console.log(`User ${user} logged in`);
  })
  .on("message", async (message) => {
    if (message.room()) {
      allMessage.addMessage(message.room().id, {
        time: message.date(),
        name: message.talker().name(),
        content: await message.mentionText(),
      });
    } else {
      allMessage.addMessage(message.talker().name(), {
        time: message.date(),
        name: message.talker().name(),
        content: await message.mentionText(),
      });
    }
    const wechat = new Wechat(message, bot);
    const session = wechat.getSession();
    session.handle(message, bot);
  });

// 启动机器人
bot
  .start()
  .then(() => console.log("Bot started."))
  .catch((error) => console.error("Bot failed to start:", error));
