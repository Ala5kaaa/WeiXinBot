const punycode = require("punycode");

class CommandHandler {
  constructor() {
    this.commands = {};
  }

  registerCommand(commandName, command) {
    this.commands[commandName] = command;
  }

  async handle(commandName, message, bot) {
    if (this.commands[commandName]) {
      await this.commands[commandName].execute(message, bot);
    } else {
      if (commandName){
        console.log(`Command ${commandName} not recognized`);
      }
    }
  }
}

module.exports = CommandHandler;
