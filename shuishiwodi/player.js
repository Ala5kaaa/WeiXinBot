class Player {
  constructor(id) {
    this.id = id; // 玩家ID
    // 玩家拿到的词
    this.word = "";
    // 玩家是否卧底
    this.isUndercover = false;
  }

  // 设置玩家的词
  setWord(word) {
    this.word = word;
  }

  // 设置玩家为卧底
  setUndercover() {
    this.isUndercover = true;
  }
}

module.exports = { Player };
