const fs = require('fs');
const path = require('path');
let tiku = {
    singleQuestions: [],
    compoundQuestions: []
};

try {
    tiku = JSON.parse(fs.readFileSync(path.join(__dirname, 'tiku.json')));
}catch (e){
    console.log('解析题库文件失败');
    console.error(e);
}

class Kaogong {
  constructor() {
      // 年份, 0表示不限年份
        this.year = 0;
        // 地区, 0表示不限地区
        this.area = 0;
        // 大类, 0表示不限科目
        this.category = 0;
        // 是否解答完成
        this.isFinished = false;
        // 是单题还是复合
        this.isSimple = false;
        // 单题的答案和解析
        this.question = '';
        this.answer = '';
        this.analysis = '';
        // 复合题的题目和答案
        this.questions = [];
        this.answers = [];
        this.analysises = [];
        // 生成的题目数量
        this.questionCount = 1;
        // 单题
        this.singleQuestions = tiku.singleQuestions
        // 复合题
        this.compoundQuestions = tiku.compoundQuestions
  }

  // 单题模式
    simpleMode() {
        this.isSimple = true;
        this.question = this.generateQuestion();
    }
    generateQuestion() {
      // 读取单题题库，随机选一个单题
        const {id,area,year,pointsName} = this.singleQuestions[Math.floor(Math.random() * this.singleQuestions.length)];
    }


    // 复合题模式
}
