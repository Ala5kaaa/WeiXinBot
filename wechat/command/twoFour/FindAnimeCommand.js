const ICommand = require("../ICommand");

class FindAnimeCommand extends ICommand {
    constructor() {
        super();
        this.apiUrl = 'https://www.hhlqilongzhu.cn/api/ziyuan_nanfeng.php?keysearch=';
    }

    async execute(message, bot) {
        // 获取消息内容
        const content = await message.mentionText();
        const contentTrim = content.trim();
        this.fetchData(contentTrim.slice(1))
            .then(data => {
                const jsonDataString = JSON.stringify(data); // 将JSON数据转换为字符串
                console.log(data)
                message.say("搜到的动漫如下：\n"+jsonDataString)
                // 在这里可以进一步处理数据
            })
            .catch()
    }

    fetchData(name) {
        return fetch(this.apiUrl + name)
            .then(response => response.json())
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
}

module.exports = FindAnimeCommand;
