class FindMusic {
    constructor() {
        this.name = '';
        this.apiUrl = 'https://www.hhlqilongzhu.cn/api/dg_qqmusic_SQ.php?msg=';
    }
    initMusic(name) {
        this.name = name;
        return this.fetchData(this.apiUrl + this.name)
            .then(data => data);
    }

    getMusic(num){
        return this.fetchData(this.apiUrl + this.name + "&n=" + num)
            .then(data => data);
    }

    fetchData(name) {
        return fetch(name)
            .then(response => response.text())
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

}
module.exports = FindMusic;

const  api = new FindMusic();
