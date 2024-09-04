const ICommand = require("../ICommand");
const gameMap = require("./gameMap");
const FindMusic = require("../../../towFour/souge/findMusic")
const {TwentyFourGame} = require("../../../towFour/twoFour");

class SouGeCommand extends ICommand {
    constructor() {
        super();
    }

    async execute(message, bot) {
        const content = await message.mentionText();
        const contentTrim = content.trim(); //过滤出说话内容

        const souGeName = "souge:" + message.room().id;
        let game = gameMap.get(souGeName); //设置搜索歌曲房间信息
        console.log("开始找歌")
        if (contentTrim.startsWith("搜歌")) {
            console.log("搜歌")
            gameMap.delete(souGeName);

            const souGe = new FindMusic();

            gameMap.set(souGeName, souGe);
            souGe.initMusic(contentTrim.slice(2)).then(data => {
                // let word = "";
                // data.content.forEach(item => {     //遍历json
                //     word += (item + "\n");
                // });
                message.say(data);
            });
        } else if (contentTrim.startsWith("选歌")) {
            if (!game) {
                await message.say("还没开始搜歌")
            } else {
                game.getMusic(contentTrim.slice(2)).then(data => {
                    //const jsonDataString = JSON.stringify(data.data); // 将JSON数据转换为字符串
                    message.say(data);
                });
            }

        }

    }

}

module.exports = SouGeCommand;

