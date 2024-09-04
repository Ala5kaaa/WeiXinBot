const ICommand = require("../ICommand");

class BaiduTiKuCommand extends ICommand {
	constructor() {
        super();
        this.apiUrl = 'https://api.pearktrue.cn/api/baidutiku/?question= ';
    }
	
	async execute(message, bot){
		// 获取消息内容
		const content = await message.mentionText();
        const contentTrim = content.trim();
		this.fetchData(contentTrim.slice(1))
		    .then(data => {
				try{
				console.log(data)
				message.say("options:\n"+data.data.options+"\nanswer:\n"+data.data.answer)
				} catch(e) {
                    message.say("query failed")
                }
                })
			.catch()
	}
	
	fetchData(name) {
        return fetch(this.apiUrl+name)
            .then(response => response.json())
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
}

module.exports = BaiduTiKuCommand;

