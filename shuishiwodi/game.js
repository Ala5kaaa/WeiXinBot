const { Player } = require("./player");
const words = require("./words");

class ShuiShiWoDiGame {
  constructor() {
    this.reset();
  }
  reset() {
    this.status = 0; // 游戏状态 0: 未开始 1: 游戏中 2: 游戏结束
    this.undercoverWord = ""; // 卧底词
    this.normalWord = ""; // 平民词
  }

  // 初始化游戏
  initGame() {
    let { undercover, normal } = this.getWords();
    this.undercoverWord = undercover;
    this.normalWord = normal;
    this.players = []; // 游戏中所有玩家
    this.undercoverPlayers = []; // 卧底玩家
    this.normalPlayers = []; // 平民玩家
    // 还在游戏中的玩家
    this.playingPlayers = [];
    this.status = 1;
    // 当前发言玩家
    this.currentPlayerIndex = 0;
    // 当前回合
    this.round = 1;
  }

  // 获取词语
  getWords() {
    let index = Math.floor(Math.random() * words.length);
    return words[index];
  }

  // 添加玩家
  addPlayer(id) {
    // 不限制玩家数量
    const player = new Player(id);
    this.players.push(player);
    this.playingPlayers.push(player);
  }

  // 淘汰玩家
  eliminatePlayer(player) {
    let index = this.playingPlayers.indexOf(player);
    if (index > -1) {
      this.playingPlayers.splice(index, 1);
    }
  }

  // 卧底是否胜利：好人的数量减至比卧底多1
  isUndercoverWin() {
    // 从游戏中玩家中筛选出卧底
    let undercoverPlayers = this.playingPlayers.filter(
      (player) => player.isUndercover
    );
    // 从游戏中玩家中筛选出平民
    let normalPlayers = this.playingPlayers.filter(
      (player) => !player.isUndercover
    );
    // 平民数量只比卧底数量多1
    return normalPlayers.length === undercoverPlayers.length + 1;
  }
  // 平民是否胜利：卧底全部被找出
  isNormalWin() {
    // 从游戏中玩家中筛选出卧底
    let undercoverPlayers = this.playingPlayers.filter(
      (player) => player.isUndercover
    );
    // 卧底数量为0
    return undercoverPlayers.length === 0;
  }
}

module.exports = { ShuiShiWoDiGame };
