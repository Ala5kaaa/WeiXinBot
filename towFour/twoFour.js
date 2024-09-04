const {CreateNumbers} = require("./createNumbers");
class TwentyFourGame {
    constructor() {
        this.numbers = [];
    }

    // 生成随机的四个数字
    generateNumbers() {
        this.numbers = CreateNumbers.generateUniqueArray();
        return this.numbers;
    }

    // 判断两个数字是否相等（使用误差小于0.001的比较）
    static isEqual(a, b) {
        return Math.abs(a - b) < 0.001;
    }

    static checkNumbers(str, arr) {
        // 正则表达式匹配字符串中的数字
        const numbers2 = str.match(/\d+/g);

        // 如果匹配到的数字数量不为四个，直接返回false
        if (!numbers2 || numbers2.length !== 4) {
            return false;
        }

        // 将匹配到的数字字符串转换为数字数组
        const parsedNumbers = numbers2.map(Number);

        // 遍历给定数组中的数字，查找它们是否都在匹配到的数字数组中
        for (let i = 0; i < arr.length; i++) {
            const num = arr[i];
            const index = parsedNumbers.indexOf(num);

            // 如果给定数组中的某个数字不在匹配到的数字数组中，则返回false
            if (index === -1) {
                return false;
            }

            // 如果找到了对应的数字，则从匹配到的数字数组中移除该数字，避免重复匹配
            parsedNumbers.splice(index, 1);
        }

        // 如果匹配到的数字数组为空，说明字符串中的数字正好与给定数组一致
        return parsedNumbers.length === 0;
    }

    // 输出随机题目
    printQuestion() {
        return "请使用以下数字通过加减乘除运算得到24：" + this.numbers.join(", ");
    }

    // 检查答案是否正确
    checkAnswer(answer) {
        answer = answer.replace(/（/g, '(').replace(/）/g, ')').replace(/÷/g, '/');
        try {
            const userAnswer = eval(answer); // 使用eval函数计算用户输入的表达式
            if (TwentyFourGame.isEqual(userAnswer, 24) && TwentyFourGame.checkNumbers(answer, this.numbers)) {
                return "恭喜你，答对了";
            } else {
                return "菜就多练";
            }
        } catch (err) {
            return "格式错误，请重新输入";
        }
    }
}

module.exports = {TwentyFourGame};
// // 示例用法：
// // 输出随机题目
// const numbers = TwentyFourGame.printQuestion();
// // 检查答案是否正确
// const answer = "(1+2)*3+4";
// const isCorrect = TwentyFourGame.checkAnswer(numbers, answer);
// console.log("答案是否正确：", isCorrect);
