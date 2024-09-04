const ICommand = require("../ICommand");
const {FileBox} = require('file-box');

class ReadWorldCommand extends ICommand {
    constructor() {
        super();
        this.apiUrl = 'http://www.wudada.online/Api/ScD';
    }

    async execute(message, bot) {
        let word = "";
        this.fetchData()
            .then(data => {
                data.data.content.forEach(item => {     //遍历json
                    word += (item.content + "\n");
                });
                message.say(word);
            });
    }

    fetchData() {
        return fetch(this.apiUrl)
            .then(response => response.json())
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
}

module.exports = ReadWorldCommand;
