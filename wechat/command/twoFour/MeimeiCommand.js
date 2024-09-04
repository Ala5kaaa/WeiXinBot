const ICommand = require("../ICommand");

class MeimeiCommand extends ICommand {
	constructor() {
        super();
        this.apiUrl = 'https://api.lolimi.cn/API/AI/mm.php?msg=';
    }
	
	async execute(message, bot){
		// ??????????
		const content = await message.mentionText();
        const contentTrim = content.trim();
		this.fetchData(contentTrim.slice(2))
		    .then(data => {
                console.log(data)
                message.say(data.data.output)
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

module.exports = MeimeiCommand;
 
