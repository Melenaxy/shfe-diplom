export class Data {
    constructor() {
        this.URL = 'https://shfe-diplom.neto-server.ru';
        this.header = {
            'Content-Type': 'application/json;charset=utf-8'
        };
    }

    async getAllData() {
        try {
            let path = `${this.URL}/alldata`;
            let result = await fetch(path, {
                method: 'GET',
                headers: this.header,
            })
            if (result.ok === true) {
                return result.json();
            } else {
                return null;
            }
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    async Login(data) {
        try {
            let path = `${this.URL}/login`;
            let result = await fetch(path, {
                method: 'POST',
                body: data
            })
            if (result.ok === true) {
                return result.json();
            } else {
                return null;
            }
        } catch (e) {
            console.error(e);
            return null;
        }
    }
}

