// 命令接口
class ICommand {
  constructor() {
  }

  execute() {
    throw new Error("This method should be overwritten!");
  }
}

module.exports = ICommand;
