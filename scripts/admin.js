import { Data } from './data.js'

class Admin {
    constructor() {
        this.apiData = new Data();
        this.data = {};
        this.currentHall = {};
        this.currentHallPrices = {};

        this.hallsList = document.getElementById('hallsList');
        this.hallsConfig = document.getElementById('hallsConfig');

        this.hallRowsInput = document.getElementById('hallRows');
        this.hallPlacesInput = document.getElementById('hallPlaces');
        this.seatsPlacesConfig = document.getElementById('seatsPlacesConfig');
        this.saveSeatsConfig = document.getElementById('saveSeatsConfig');
        this.cancelSeatsConfig = document.getElementById('cancelSeatsConfig');

        this.pricesConfig = document.getElementById('pricesConfig');
        this.standartPriceValue = document.getElementById('standartPriceValue');
        this.vipPriceValue = document.getElementById('vipPriceValue');
        this.savePricesConfig = document.getElementById('savePricesConfig');
        this.cancelPricesConfig = document.getElementById('cancelPricesConfig');

        this.createHallModal = document.getElementById('createHallModal');
        this.createHallForm = document.getElementById('createHallForm');

        this.addEventListeners();
        this.initData();
    }

    addEventListeners() {
        this.createHallModal.addEventListener('click', ({ currentTarget, target }) => {
            const isClickedOnBackdrop = target === currentTarget;
            if (isClickedOnBackdrop) {
                currentTarget.close();
            }
        });
        this.createHallForm.addEventListener('submit', (e) => this.addHall());

        this.hallRowsInput.addEventListener('input', (e) => this.hallRowsInputHandler());
        this.hallPlacesInput.addEventListener('input', (e) => this.hallPlacesInputHandler());
        this.saveSeatsConfig.addEventListener('click', () => this.saveSeatsConfiguration());
        this.cancelSeatsConfig.addEventListener('click', () => this.cancelSeatsConfiguration())

        this.standartPriceValue.addEventListener('input', (e) => this.standartPriceHandler());
        this.vipPriceValue.addEventListener('input', (e) => this.vipPriceHandler());
        this.savePricesConfig.addEventListener('click', () => this.savePricessConfig());
        this.cancelPricesConfig.addEventListener('click', () => this.cancelPricessConfig());
    }

    async initData() {
        this.data = await this.apiData.getAllData();
        this.oldData = structuredClone(this.data);
        if (this.data.success) {
            this.halls = this.data.result.halls;
            this.films = this.data.result.films;
            this.seances = this.data.result.seances;

            this.initHallsList();
        } else {
            alert(res.error);
        }
    }

    initHallsList() {
        if (this.halls) {
            console.log(this.halls);
            this.hallsList.innerHTML = '';
            this.hallsConfig.innerHTML = '';
            this.pricesConfig.innerHTML = '';
            for (let hall of this.halls) {
                this.hallsList.innerHTML += `
                    <li class="halls-list-item">
                        <div class="halls-list-item-text" id="${hall.id}">${hall.hall_name}</div>
                        <div class="halls-list-item-img"></div>
                    </li>`;
                this.hallsConfig.innerHTML += `
                    <li class="halls-config-item halls-config" id="${hall.id}">
                        ${hall.hall_name}
                    </li>`;
                this.pricesConfig.innerHTML += `
                    <li class="halls-config-item prices-config" id="${hall.id}">
                        ${hall.hall_name}
                    </li>`;
            };
            this.removeHallBtns = Array.from(document.querySelectorAll('.halls-list-item-img'));
            this.removeHallBtns.forEach(btn => btn.addEventListener('click', (e) => this.removeHall(e)));

            this.hallsConfigArray = Array.from(document.querySelectorAll('.halls-config'));
            this.hallsConfigArray.forEach(btn => btn.addEventListener('click', (e) => this.configHall(e)));
            let event = new Event("click");
            this.hallsConfigArray[0].dispatchEvent(event);

            this.pricesConfigArray = Array.from(document.querySelectorAll('.prices-config'));
            this.pricesConfigArray.forEach(btn => btn.addEventListener('click', (e) => this.configPrices(e)));
            this.pricesConfigArray[0].dispatchEvent(event);
        }
    }

    addHall() {
        let formData = new FormData(this.createHallForm);
        let name = formData.get('hallName');
        this.createHallForm.reset();
        if (formData) {
            console.log(name)
            this.apiData.addNewHall(formData).then(res => {
                if (res.success) {
                    this.halls = res.result.halls;
                    this.initHallsList();
                } else {
                    alert(res.error);
                }
            })
        }
    }

    removeHall(e) {
        let result = confirm('Вы уверены, что хотите удалить выбранный зал?');
        if (result) {
            let id = e.target.previousElementSibling.id;
            if (id) {
                this.apiData.removeHall(id).then(res => {
                    if (res.success) {
                        this.halls = res.result.halls;
                        this.initHallsList();
                    } else {
                        alert(res.error);
                    }
                })
            }
        }
    }

    configHall(e) {
        this.seatsPlacesConfig.innerHTML = '';
        if (e) {
            this.hallsConfigArray.forEach(s => s.classList.remove('active'));
            e.target.classList.add('active');
            this.currentHall = this.halls.find(s => s.id === Number(e.target.id));
            this.saveSeatsConfig.disabled = true;
            this.cancelSeatsConfig.disabled = true;
        };

        if (this.currentHall) {
            this.hallRowsInput.value = this.currentHall.hall_rows;
            this.hallPlacesInput.value = this.currentHall.hall_places;
            let config = this.currentHall.hall_config;
            for (let i = 0; i < this.currentHall.hall_rows; i++) {
                let text = `<div class="halls-rows-config">`
                for (let j = 0; j < this.currentHall.hall_places; j++) {
                    text += `<div class="halls-seats ${config[i] ? config[i][j] ? config[i][j] : 'standart' : 'standart'}"></div>`
                };
                this.seatsPlacesConfig.innerHTML += text + `</div>`;
                this.seatsConfigArray = Array.from(document.querySelectorAll('.halls-seats'));
                this.seatsConfigArray.forEach(seat => seat.addEventListener('click', (e) => {
                    this.saveSeatsConfig.disabled = false;
                    this.cancelSeatsConfig.disabled = false;
                    if (e.target.classList.contains('disabled')) {
                        e.target.classList.remove('disabled');
                        e.target.classList.add('standart');
                    } else if (e.target.classList.contains('standart')) {
                        e.target.classList.remove('standart');
                        e.target.classList.add('vip');
                    } else {
                        e.target.classList.remove('vip');
                        e.target.classList.add('disabled');
                    }
                }));
            };
        }
    }

    hallRowsInputHandler() {
        if (this.hallRowsInput.value > 10) {
            this.hallRowsInput.value = 10;
        };
        let value = Number(this.hallRowsInput.value);
        this.saveSeatsConfig.disabled = false;
        this.cancelSeatsConfig.disabled = false;
        if (value !== this.currentHall.hall_rows) {
            this.currentHall.hall_rows = value;
            this.configHall();
        };
    }

    hallPlacesInputHandler() {
        if (this.hallPlacesInput.value > 10) {
            this.hallPlacesInput.value = 10;
        };
        let value = Number(this.hallPlacesInput.value);
        this.saveSeatsConfig.disabled = false;
        this.cancelSeatsConfig.disabled = false;
        if (value !== this.currentHall.hall_places) {
            this.currentHall.hall_places = value;
            this.configHall();
        };
    }

    saveSeatsConfiguration() {
        const arrayConfig = [];
        let rows = Array.from(this.seatsPlacesConfig.querySelectorAll('.halls-rows-config'))
        for (let i = 0; i < rows.length; i++) {
            arrayConfig.push([])
            for (const child of rows[i].children) {
                console.log(child.classList[1]);
                arrayConfig[i].push(child.classList[1])
            }
        };

        const params = new FormData();
        params.set('rowCount', this.currentHall.hall_rows);
        params.set('placeCount', this.currentHall.hall_places);
        params.set('config', JSON.stringify(arrayConfig));
        this.apiData.changeHallConfig(this.currentHall.id, params).then(res => {
            if (res.success) {
                this.saveSeatsConfig.disabled = true;
                this.cancelSeatsConfig.disabled = true;
                this.currentHall = res.result;
                this.configHall();
            } else {
                alert(res.error);
            }
        })
    }

    cancelSeatsConfiguration() {
        //let id = this.currentHall.id
        this.initData();

        // let index = this.hallsConfigArray.findIndex(s => Number(s.id) === id);
        // let event = new Event("click");
        // this.currentHall = this.halls.find(s => s.id === id);
        // this.configHall();
        // this.hallsConfigArray[index].dispatchEvent(event);
    }

    configPrices(e) {
        if (e) {
            this.pricesConfigArray.forEach(s => s.classList.remove('active'));
            e.target.classList.add('active');
            this.currentHallPrices = this.halls.find(s => s.id === Number(e.target.id));
            this.savePricesConfig.disabled = true;
            this.cancelPricesConfig.disabled = true;
        };

        if (this.currentHallPrices) {
            this.standartPriceValue.value = this.currentHallPrices.hall_price_standart;
            this.vipPriceValue.value = this.currentHallPrices.hall_price_vip;
        };
    }

    standartPriceHandler() {
        this.savePricesConfig.disabled = false;
        this.cancelPricesConfig.disabled = false;

        let value = Number(this.standartPriceValue.value);
        this.savePricesConfig.disabled = false;
        this.cancelPricesConfig.disabled = false;
        if (value !== this.currentHallPrices.hall_price_standart) {
            this.currentHallPrices.hall_price_standart = value;
        };
    }

    vipPriceHandler() {
        this.savePricesConfig.disabled = false;
        this.cancelPricesConfig.disabled = false;

        let value = Number(this.vipPriceValue.value);
        this.savePricesConfig.disabled = false;
        this.cancelPricesConfig.disabled = false;
        if (value !== this.currentHallPrices.hall_price_vip) {
            this.currentHallPrices.hall_price_vip = value;
        };
    }

    savePricessConfig() {
        const params = new FormData()
        params.set('priceStandart', this.currentHallPrices.hall_price_standart);
        params.set('priceVip', this.currentHallPrices.hall_price_vip);

        this.apiData.changePricesConfig(this.currentHallPrices.id, params).then(res => {
            console.log(res)
            if (res.success) {
                this.savePricesConfig.disabled = true;
                this.cancelPricesConfig.disabled = true;
                this.currentHallPrices = res.result;
                this.configPrices();
            } else {
                alert(res.error);
            }
        })
    }

    cancelPricessConfig() {
        this.initData();
    }


}

new Admin();