const ICommand = require("../ICommand");

class KFCvFiftyCommand extends ICommand {
	constructor() {
        super();
        this.apiUrl = 'https://api.pearktrue.cn/api/kfc';
    }
	
	async execute(message, bot){
		const content = await message.mentionText();
        const contentTrim = content.trim();
		this.fetchData(contentTrim.slice(0))
		    .then(data => {
                console.log(data)
                message.say(data.text)//È¡text¡®
			})
			.catch()
	}
	
	fetchData() {
        return fetch(this.apiUrl)
            .then(response => response.json())
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
}

module.exports = KFCvFiftyCommand;

