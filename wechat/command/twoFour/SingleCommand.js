const ICommand = require("../ICommand");
const gameMap = require("./gameMap");
const axios = require('axios');
const { FileBox } = require('file-box');
const fs = require('fs');
const puppeteer = require('puppeteer');
const path = require('path');
const SingleTiku = require("./SingleTiku");

class DrawCommand extends ICommand {
    constructor() {
        super();
    }

    async execute(message, bot) {
		const room = message.room();
        let game = gameMap.get(room.id);
		// 获取消息内容
        const content = await message.mentionText();
        const contentTrim = content.trim();
		
		if (contentTrim.startsWith("单选")){
			console.log("题目")
            gameMap.delete(room.id);
			//const question = new SingleTiku();
			// 请求地址
			// https://ns.huatu.com/q/v4/questions?ids=3082281&terminal=2&appType=2
			const url = 'https://ns.huatu.com/q/v4/questions?ids=';
			// 随机读取1个id，从tiku.josn的singleQuestions中,限定area
			const data = fs.readFileSync(path.resolve(__dirname, '../../../kaogong/tiku.json'));
			const allData = JSON.parse(data);

			const singleQuestions = allData.singleQuestions;

			let singleQ = [];
			let j = 0;
			for (let i=0;i<=singleQuestions.length;i++){
				//console.log(singleQuestions[i]?.area)
				if((singleQuestions[i]?.area == -9) || (singleQuestions[i]?.area == 1963)){
					singleQ[j] = singleQuestions[i];
					j+=1;
				}
			}
			const randomIndex = Math.floor(Math.random() * singleQ.length);
			const id = singleQ[randomIndex].id;
			
			// 请求数据
			const response = await axios.get(`${url}${id}&terminal=2&appType=2`);
			const responseData = response.data.data;
			const {singleQuestions : single} = responseData;
			const question = single[0];
			const {stem='',choices=[]} = question;
			// 判断stem和choices中是否有一个有图片，有图片则需要转成图片，否则提取文本返回
			if(stem.includes('img') || choices.some(choice => choice.includes('img'))) {
				// 将stem和choices组合一起，加点好看的样式，并且选项要有ABCD...
				const htmlContent = `
					<div style="font-size: 18px; padding: 10px;">
						<div style="font-size: 20px; font-weight: bold;">${stem}</div>
						<ul>
							${choices.map((choice, index) => `<li>${String.fromCharCode(65 + index)}. ${choice}</li>`).join('')}
						</ul>
					</div>
				`;
				const fileBox = await this.htmlToPng(htmlContent);
				await message.say(fileBox);
			} else {
				// stem和choices都是html文本，需要提取文本
				const stemText = this.extractText(stem);
				const choicesText = choices.map(choice => this.extractText(choice));
				//组合文本，选项要有ABCD...，题目和每个选项之间要有换行并且空一行
				const text = `${stemText}\n\n${choicesText.map((choice, index) => `${String.fromCharCode(65 + index)}. ${choice}`).join('\n\n')}`;
				await message.say(text);
				}
			//
			gameMap.set(room.id, question);
			const a=gameMap.get(room.id);
			console.log(a)
		} else if(contentTrim.startsWith("答")){
			if (!game){
				await message.say("未开始答题")
			} else {
				const a=gameMap.get(room.id);
				if((contentTrim.slice(1).charCodeAt(0)-96) == a.answer) {
					message.say("恭喜你，答对了\n"+a.analysis)
				} else if((contentTrim.slice(1).charCodeAt(0)-64) == a.answer) {
					message.say("恭喜你，答对了\n"+a.analysis)
				} else if(contentTrim.slice(1) == a.answer) {
					message.say("恭喜你，答对了\n"+a.analysis)
				} else {
				message.say("菜就多练，这都答错\n选："+String.fromCharCode(a.answer + 96)+'\n'+a.analysis)
				}
			}
			gameMap.delete(room.id);
			//下一题
			// 请求地址
			// https://ns.huatu.com/q/v4/questions?ids=3082281&terminal=2&appType=2
			const url = 'https://ns.huatu.com/q/v4/questions?ids=';
			// 随机读取1个id，从tiku.josn的singleQuestions中
			const data = fs.readFileSync(path.resolve(__dirname, '../../../kaogong/tiku.json'));
			const allData = JSON.parse(data);
			const singleQuestions = allData.singleQuestions;
			let singleQ = [];
			let j = 0;
			for (let i=0;i<=singleQuestions.length;i++){
				if((singleQuestions[i]?.area == -9) || (singleQuestions[i]?.area == 1963)){
					singleQ[j] = singleQuestions[i];
					j+=1;
				}
			}
			const randomIndex = Math.floor(Math.random() * singleQ.length);
			const id = singleQ[randomIndex].id;
			
			// 请求数据
			const response = await axios.get(`${url}${id}&terminal=2&appType=2`);
			const responseData = response.data.data;
			const {singleQuestions : single} = responseData;
			const question = single[0];
			const {stem='',choices=[]} = question;
			//let game = gameMap.get();
			// 判断stem和choices中是否有一个有图片，有图片则需要转成图片，否则提取文本返回
			if(stem.includes('img') || choices.some(choice => choice.includes('img'))) {
				// 将stem和choices组合一起，加点好看的样式，并且选项要有ABCD...
				const htmlContent = `
					<div style="font-size: 18px; padding: 10px;">
						<div style="font-size: 20px; font-weight: bold;">${stem}</div>
						<ul>
							${choices.map((choice, index) => `<li>${String.fromCharCode(65 + index)}. ${choice}</li>`).join('')}
						</ul>
					</div>
				`;
				const fileBox = await this.htmlToPng(htmlContent);
				await message.say(fileBox);
			} else {
				// stem和choices都是html文本，需要提取文本
				const stemText = this.extractText(stem);
				const choicesText = choices.map(choice => this.extractText(choice));
				//组合文本，选项要有ABCD...，题目和每个选项之间要有换行并且空一行
				const text = `${stemText}\n\n${choicesText.map((choice, index) => `${String.fromCharCode(65 + index)}. ${choice}`).join('\n\n')}`;
				await message.say(text);
				}
			gameMap.set(room.id, question);
			const a=gameMap.get(room.id);
			console.log(a)
		}
    }

    async  htmlToPng (htmlContent) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(htmlContent);
        const fileBox = FileBox.fromBase64(await page.screenshot({encoding: 'base64'}), 'question.png');
        await browser.close();
        return fileBox;
    }
    extractText(html) {
        return html.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, '').trim();
    }
}

module.exports = DrawCommand;
