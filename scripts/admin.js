import { Data } from './data.js'

class Admin {
    constructor() {
        this.apiData = new Data();
        this.data = {};

        this.hallsList = document.getElementById('hallsList');
        this.hallsConfig = document.getElementById('hallsConfig');

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

    }

    async initData() {
        this.data = await this.apiData.getAllData();
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
            };
            this.removeHallBtns = Array.from(document.querySelectorAll('.halls-list-item-img'));
            this.removeHallBtns.forEach(btn => btn.addEventListener('click', (e) => this.removeHall(e)));

            this.hallsConfigArray = Array.from(document.querySelectorAll('.halls-config'));
            this.hallsConfigArray[0].classList.add('active');
            this.hallsConfigArray.forEach(btn => btn.addEventListener('click', (e) => {
                this.hallsConfigArray.forEach(s => s.classList.remove('active'));
                e.target.classList.add('active');
            }));
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
}

new Admin();