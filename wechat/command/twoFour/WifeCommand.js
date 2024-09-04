const ICommand = require("../ICommand");
const axios = require('axios');

class WifeCommand extends ICommand {
	constructor() {
        super();
        this.apiUrl = 'https://api.lolimi.cn/API/fabing/fb.php?name=';
    }

	async execute(message, bot) {
		// 获取消息内容
        const content = await message.mentionText();
        const contentTrim = content.trim();
        this.fetchData(contentTrim.slice(2))
			.then(data => {
				console.log(data)
                message.say(data.data)
			})
			.catch()
        
	}
	
	fetchData(name) {
        return axios.get(this.apiUrl + name)
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
}

module.exports = WifeCommand;
