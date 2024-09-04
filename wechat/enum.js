//  模式枚举
const MODE = {
    GPT: 1,
    DOU_DI_ZHU: 2,
    SHU_DU: 3,
    TWO_FOUR: 4,
    Qi_GUI: 5,
};

// 聊天模式
const TALK_MODE = {
    GROUP: 1, // 群聊
    PRIVATE: 2, // 私聊
    GROUP_AT: 3, // 群聊@我
    ALL: 4, // 通用
}

module.exports = {
    MODE,
    TALK_MODE
}
