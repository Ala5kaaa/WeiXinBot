const axios = require('axios');

class ChatGpt {
    constructor() {
        this.url = 'https://api.binjie.fun/api/generateStream';
        this.headers = {
            'Origin': 'https://chat6.aichatos.com',
            'Referer': 'https://chat6.aichatos.com/'
        };
        this.userIdMap = new Map();
    }

    async post(prompt, id) {
        const userId = this.userIdMap.get(id);
        if (!userId) {
            // 存一个时间戳
            const timestamp = Date.now();
            this.userIdMap.set(id, timestamp);
        }
        try {
            const requestBody = {
                prompt: prompt,
                userId: userId,
                network: false,
                system: "",
                withoutContext: false,
                stream: false
            };

            const response = await axios.post(this.url, requestBody, {
                headers: this.headers,
            });

            return response.data;
        } catch (error) {
            console.error(`HTTP POST request to ${this.url} failed: ${error}`);
            throw error;
        }
    }
}

module.exports = {ChatGpt};
