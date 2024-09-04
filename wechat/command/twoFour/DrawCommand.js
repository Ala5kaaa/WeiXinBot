const ICommand = require("../ICommand");
const axios = require('axios');
const {FileBox} = require('file-box');

class DrawCommand extends ICommand {
    constructor() {
        super();
        this.apiUrl = 'https://api-collect.idcdun.com/v1/images/generations?prompt=';
    }

    async execute(message, bot) {
        // 获取消息内容
        const content = await message.mentionText();
        const contentTrim = content.trim();
        message.say("正在画" + contentTrim.slice(1) + "...")
        this.fetchData(contentTrim.slice(1))
            .then(async data => {
                // 读取URL
                try {
                    const imageUrl = data.data[0].url;
                    const fileBox = FileBox.fromUrl(imageUrl, 'random.jpg');
                    // 发送图片
                    await message.say(fileBox);
                } catch (e) {
                    await message.say(contentTrim.slice(1) + "的图片生成失败")
                }
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

module.exports = DrawCommand;
