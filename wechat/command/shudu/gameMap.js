const gameMap = (() => {
    // 私有变量，用于存储单例实例
    let instance = null;

    // 返回单例对象的方法
    const getInstance = () => {
        // 如果单例实例不存在，则创建新的实例
        if (!instance) {
            instance = new Map();
        }
        // 返回单例实例
        return instance;
    };

    // 将 getInstance 方法导出
    return { getInstance };
})();

// 导出单例对象的方法
module.exports = gameMap.getInstance();
