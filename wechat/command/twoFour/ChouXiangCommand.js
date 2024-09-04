const ICommand = require("../ICommand");

class ChouXiangCommand extends ICommand {
	constructor() {
        super();
        this.apiUrl = 'http://api.milorapart.top/test/abstract/chouxiang.php?text=';
    }
	
	async execute(message, bot){
		// ��ȡ��Ϣ����
		const content = await message.mentionText();
        const contentTrim = content.trim();
		this.fetchData(contentTrim.slice(2))
		    .then(data => {
                console.log(data)
                message.say(data.result)
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

module.exports = ChouXiangCommand;