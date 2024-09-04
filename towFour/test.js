class DragonBallSuperAPI {
    constructor() {
        this.apiUrl = 'https://www.hhlqilongzhu.cn/api/ziyuan_nanfeng.php?keysearch=';
    }
    fetchData(name) {
        return fetch(this.apiUrl + name)
            .then(response => response.json())
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    printData(name) {
        this.fetchData(name)
            .then(data => {
                console.log(data); // 打印返回的JSON数据
                // 在这里可以进一步处理数据
            });
    }
}

// 创建 DragonBallSuperAPI 实例
const api = new DragonBallSuperAPI();

// 调用 printData 方法来获取并打印数据
api.printData("因为太怕痛");
