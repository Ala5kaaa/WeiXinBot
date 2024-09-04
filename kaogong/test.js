const axios = require('axios');
const fs = require('fs');
const puppeteer = require('puppeteer');
const {FileBox} = require("file-box");

const url = 'https://ns.huatu.com/q/v4/questions?ids=';
const batchSize = 500; // 每批次请求的数据量
const totalIds = 50000000; // 总共的数据量
const batchSizeLimit = 1000000; // 每个文件保存的数据量上限
let count = 0;
let fileIndex = 0;

async function fetchData(startId) {
    const allData = { "singleQuestions": [], "compositeQuestions": [] };

    while (startId < totalIds && count < batchSizeLimit) {
        const endId = Math.min(startId + batchSize, totalIds);
        const ids = Array.from({ length: endId - startId }, (v, k) => k + startId + 30000).join(',');
        try {
            const response = await axios.get(`${url}${ids}&terminal=2&appType=2`);
            const data = response.data.data;
            processAndSaveData(data, allData);
            count += batchSize;
            console.log(`已获取 ${count} 条数据`);
            startId = endId; // 更新起始 ID
        } catch (error) {
            console.error('Error fetching data:', error);
            break; // 如果出现错误，跳出循环
        }
    }
    
    console.log('获取数据完成');
    return allData;
}

function processAndSaveData(data, allData) {
    const { singleQuestions = [], compositeQuestions = [] } = data;

    // 处理单个问题数据
    const singles = singleQuestions.filter(item => item.parent === 0).map(item => ({
        id: item.id,
        area: item.area,
        year: item.year,
        pointsName: item.pointsName
    }));

    // 处理组合问题数据
    const composite = compositeQuestions.map(item => ({
        id: item.id,
        questions: item.questions,
        area: singleQuestions.find(q => q.id === item.questions[0])?.area || -1,
        year: singleQuestions.find(q => q.id === item.questions[0])?.year || -1,
        pointsName: singleQuestions.find(q => q.id === item.questions[0])?.pointsName || []
    }));

    // 将处理后的数据保存到内存中
    allData.singleQuestions.push(...singles);
    allData.compositeQuestions.push(...composite);
}

async function writeDataToFile(allData) {
    const path = `tiku_${fileIndex}.json`; // 构建文件名
    
    // 将数据保存到文件中
    try {
        fs.writeFileSync(path, JSON.stringify(allData));
        console.log(`数据保存成功到文件 ${path}`);
    } catch (error) {
        console.error('Error saving data to file:', error);
    }
}

// (async () => {
//     let startId = 0;
//     while (startId < totalIds) {
//         const allData = await fetchData(startId);
//         await writeDataToFile(allData);
//         count = 0; // 重置计数器
//         fileIndex++; // 更新文件索引
//         startId += batchSizeLimit; // 更新起始 ID
//     }
// })();

// 题库合并，从tiku_0.json开始读，到tiku_49，合并到tiku.json
function mergeData() {
    const allData = { "singleQuestions": [], "compositeQuestions": [] };

    for (let i = 0; i < 50; i++) {
        const path = `tiku_${i}.json`;
        const data = JSON.parse(fs.readFileSync(path));
        const { singleQuestions, compositeQuestions } = data;
        singleQuestions.forEach(item => allData.singleQuestions.push(item));
        compositeQuestions.forEach(item => allData.compositeQuestions.push(item));
    }
}

let htmlContent =`
    <div style="font-size: 20px; padding: 20px;">
        123456
    </div>
`;
async function htmlToPng(htmlContent) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    const fileBox = FileBox.fromBase64(await page.screenshot({encoding: 'base64'}), 'question.png');
    await browser.close();
    return fileBox;
}


htmlToPng(htmlContent).then(fileBox => {
    console.log(fileBox)
})
