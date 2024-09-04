const fs = require("fs");
class RankHelper {
  constructor() {
    this.rankNames = [
      "斗者 I",
      "斗者 II",
      "斗者 III",
      "斗师 I",
      "斗师 II",
      "斗师 III",
      "大斗师 I",
      "大斗师 II",
      "大斗师 III",
      "斗灵 I",
      "斗灵 II",
      "斗灵 III",
      "斗王 I",
      "斗王 II",
      "斗王 III",
      "斗皇 I",
      "斗皇 II",
      "斗皇 III",
      "斗尊 I",
      "斗尊 II",
      "斗尊 III",
      "斗圣 I",
      "斗圣 II",
      "斗圣 III",
      "斗神 I",
      "斗神 II",
      "斗神 III",
    ];

    this.rankThresholds = [
      199,
      399,
      599,
      799,
      999,
      1199,
      1399,
      1599,
      1799,
      1999,
      2199,
      2399,
      2599,
      2799,
      2999,
      3199,
      3399,
      3599,
      3799,
      3999,
      4199,
      4399,
      4599,
      4799,
      4999,
      5199,
      Infinity,
    ];
  }

  getRankName(points) {
    for (let i = 0; i < this.rankThresholds.length; i++) {
      if (points <= this.rankThresholds[i]) {
        return this.rankNames[i];
      }
    }
    return "未知段位";
  }

  // 获取当前所有玩家段位榜
  getRankListMsg() {
    const userRank = JSON.parse(fs.readFileSync("userRank.json"));
    const rankList = [];
    for (const name in userRank) {
      const user = userRank[name];
      rankList.push({
        name,
        points: user.points,
        rank: this.getRankName(user.points),
      });
    }
    rankList.sort((a, b) => b.points - a.points);
    let msg = "排位榜：\n";
    rankList.forEach((item, index) => {
      msg += `${index + 1}. ${item.name} ${item.rank} ${item.points}\n`;
    });
    return msg;
  }

  getRank(name) {
    const userRank = JSON.parse(fs.readFileSync("userRank.json"));
    const user = userRank[name] || {
      points: 0,
      // 累计胜利次数
      winCount: 0,
      // 掉分保护卡数量
      protectionCardCount: 0,
    };
    return {
      name,
      points: user.points,
      rank: this.getRankName(user.points),
      protectionCardCount: user.protectionCardCount,
    };
  }

  addPoints(currentPoints, pointsToAdd) {
    return currentPoints + pointsToAdd;
  }

  subtractPoints(currentPoints, pointsToSubtract) {
    return Math.max(0, currentPoints - pointsToSubtract);
  }

  // 名字，是否胜利，是否地主, 对手名字（数组）
  calculatePoints(name, isWinner, isLandlord, opponents) {
    // 读取文件
    const userRank = JSON.parse(fs.readFileSync("userRank.json"));
    let user = userRank[name];
    if (!user) {
      userRank[name] = {
        points: 0,
        // 累计胜利次数
        winCount: 0,
        // 掉分保护卡数量
        protectionCardCount: 0,
      };
      user = userRank[name];
    }
    const currentPoints = user.points;
    let basePoints = 0;
    if (isLandlord) {
      basePoints = isWinner ? 25 : -25;
    } else {
      basePoints = isWinner ? 15 : -15;
    }

    // 对手段位加成，如果对手是两个人，取平均
    let opponentPoints = 0;
    opponents.forEach((opponent) => {
      const opponentRank = userRank[opponent] || {
        points: 0,
      };
      opponentPoints += opponentRank.points;
    });
    opponentPoints /= opponents.length;

    // 计算加减分
    const pointsToAdd = Math.max(
      1,
      Math.floor(basePoints + opponentPoints / 10)
    );
    let newPoints = currentPoints;
    if (user.protectionCardCount > 0) {
      user.protectionCardCount--;
    } else {
      newPoints = this.addPoints(currentPoints, pointsToAdd);
      newPoints = newPoints > 0 ? newPoints : 0;
    }
    if (isWinner) {
      user.winCount = user.winCount + 1;
      if (user.winCount >= 10) {
        user.protectionCardCount = user.protectionCardCount + 1;
        user.winCount = 0;
      }
    }
    user.points = newPoints;
    userRank[name] = user;
    fs.writeFileSync("userRank.json", JSON.stringify(userRank));
    return {
      currentPoints,
      pointsToAdd,
      newPoints,
    };
  }
}

module.exports = new RankHelper();

// // 测试
// const rankHelper = require("./RankHelper");
// console.log(rankHelper.getRankName(100));
// console.log(rankHelper.getRankName(200));
// console.log(rankHelper.getRankName(300));
//
// //calculatePoints 测试
// function testCalculatePoints() {
//   const player = [
//     "张三",
//     "李四",
//     "王五",
//     "赵六",
//     "钱七",
//     "孙八",
//     "周九",
//     "吴十",
//   ];
//   // 从player中随机选择三个人，其中一个地主，两个农民，随机决定地主是否胜利，进行100局计算，再输出getRankListMsg结果
//   for (let i = 0; i < 120; i++) {
//     // 地主数组
//     const landlords = [];
//     // 农民数组
//     const farmers = [];
//     const randomPlayer = player.sort(() => Math.random() - 0.5);
//     landlords.push(randomPlayer[0]);
//     farmers.push(randomPlayer[1]);
//     farmers.push(randomPlayer[2]);
//     // 地主是否胜利
//     const isLandlordWin = Math.random() > 0.5;
//     const result = rankHelper.calculatePoints(
//       landlords[0],
//       isLandlordWin,
//       true,
//       farmers
//     );
//     farmers.forEach((farmer) => {
//       rankHelper.calculatePoints(farmer, !isLandlordWin, false, landlords);
//     });
//   }
//   console.log(rankHelper.getRankListMsg());
// }

// testCalculatePoints();
