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

    async getHallConfiguration(params) {
        try {
            let path = `${this.URL}/hallconfig?${params}`;
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

    async getTicketsBooking(model) {
        try {
            let path = `${this.URL}/ticket`;
            let result = await fetch(path, {
                method: 'POST',
                body: model
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

    async addNewHall(model) {
        try {
            let path = `${this.URL}/hall`;
            let result = await fetch(path, {
                method: 'POST',
                body: model
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

    async removeHall(id) {
        try {
            let path = `${this.URL}/hall/${id}`;
            let result = await fetch(path, {
                method: 'DELETE',
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

    async changeHallConfig(id, params) {
        try {
            let path = `${this.URL}/hall/${id}`;
            let result = await fetch(path, {
                method: 'POST',
                body: params,
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

    async changePricesConfig(id, params) {
        try {
            let path = `${this.URL}/price/${id}`;
            let result = await fetch(path, {
                method: 'POST',
                body: params,
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

    async openCloseHall(id, params) {
        try {
            let path = `${this.URL}/open/${id}`;
            let result = await fetch(path, {
                method: 'POST',
                body: params,
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

    async addNewFilm(model) {
        try {
            let path = `${this.URL}/film`;
            let result = await fetch(path, {
                method: 'POST',
                body: model
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

    async removeFilm(id) {
        try {
            let path = `${this.URL}/film/${id}`;
            let result = await fetch(path, {
                method: 'DELETE',
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

    async addSeance(model) {
        try {
            let path = `${this.URL}/seance`;
            let result = await fetch(path, {
                method: 'POST',
                body: model
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

    async removeSeance(seanceId) {
        try {
            let path = `${this.URL}/seance/${seanceId}`;
            let result = await fetch(path, {
                method: 'DELETE',
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

