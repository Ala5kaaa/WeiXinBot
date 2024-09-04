const fs = require("fs");
class AllMessage {
  static getAllMessage() {
    // 读取文件,如果文件不存在创建文件，默认内容{}
    let data = fs.readFileSync("./allMessage.json");
    let allMessage = JSON.parse(data);
    return allMessage;
  }
  // 根据id获取消息列表
  static getMessageById(id) {
    let allMessage = this.getAllMessage();
    return allMessage[id] || [];
  }
  // 添加消息
  static addMessage(id, message) {
    let allMessage = this.getAllMessage();
    if (!allMessage[id]) {
      allMessage[id] = [];
    }
    allMessage[id].push(message);
    fs.writeFileSync("./allMessage.json", JSON.stringify(allMessage));
  }
}
module.exports = AllMessage;
