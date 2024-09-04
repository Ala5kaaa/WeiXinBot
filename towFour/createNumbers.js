
class CreateNumbers {
    constructor() {
    }
// 生成不在黑名单中的数组
    static generateUniqueArray() {
        let arr = generateRandomArray();
        while (isInBlacklist(arr)) {
            arr = generateRandomArray();
        }
        return arr;
    }
}

const fs = require('fs');

// 读取文件内容
const data = fs.readFileSync('black24.txt', 'utf8');

// 将文件内容解析为数组
const blacklist = data.split('\n').map(line => line.split(' ').map(Number));

// 生成一个 13 以内的随机数字
function generateRandomNumber() {
    return Math.floor(Math.random() * 13) + 1;
}

// 生成一个四个 13 以内数字的数组
function generateRandomArray() {
    return [generateRandomNumber(), generateRandomNumber(), generateRandomNumber(), generateRandomNumber()];
}

// 检查数组是否在黑名单中
function isInBlacklist(arr) {
    return blacklist.some(blacklistArr => {
        return arr.every(num => blacklistArr.includes(num));
    });
}

module.exports = {CreateNumbers};
