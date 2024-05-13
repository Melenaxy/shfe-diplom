import { Data } from './data.js'

class SeanceHallConfiguration {
    constructor() {
        this.apiData = new Data();

        this.params = window.location.href.split("?")[1];
        this.seanceId = Number(this.params.split('&')[0].split('=')[1]);
        this.date = this.params.split('&')[1].split('=')[1];

        this.hall = document.querySelector('.halls-row-wrapper');
        this.seats = [];
        this.bookBtn = document.querySelector('.book-btn');
        this.getSeanceDiscription();
        this.getHallConfig();
    }

    getSeanceDiscription() {
        this.apiData.getAllData().then(res => {
            if (res.success) {
                let seance = res.result.seances.find(s => s.id === this.seanceId);
                document.querySelector('.seance-start-time').textContent = seance.seance_time;
                let film = res.result.films.find(f => f.id === seance.seance_filmid);
                document.querySelector('.seance-header-text').textContent = film.film_name;
                let hall = res.result.halls.find(h => h.id === seance.seance_hallid);
                document.querySelector('.seance-hall-name').textContent = hall.hall_name;
            }
        })
    }

    async getHallConfig() {
        this.data = await this.apiData.getHallConfiguration(this.params);
        if (this.data.success) {
            this.rows = this.data.result;
            for (let i = 0; i < this.rows.length; i++) {
                let text = `<div class="halls-row">`
                for (let j = 0; j < this.rows[i].length; j++) {
                    text +=`<div class="halls-seat ${this.rows[i][j]}-seat" data-ticket_row="${i + 1}" data-ticket_place="${j + 1}"></div>`
                }
                this.hall.innerHTML += text+`</div>`;
            };
            this.addEventListeners();
        } else {
            alert(res.error);
        }
    }

    addEventListeners() {
        this.seats = Array.from(this.hall.querySelectorAll('.halls-seat'));
        if (this.seats.length > 0) {
            this.seats.forEach(seat => {
                seat.addEventListener('click', (e) => {
                    let target = e.target;
                    if (target.classList.contains('disabled-seat') || target.classList.contains('taken-seat') || target.closest('.seats-legend-wrapper')) {
                        return;
                    } else {
                        target.classList.toggle('selected-seat');
                    };
                    if (this.seats.find(s => s.classList.contains('selected-seat'))) {
                        this.bookBtn.disabled = false;
                    } else {
                        this.bookBtn.disabled = true;
                    };
                    console.log(target)
                })
            })
        }
    }
}

let seanceHallconfig = new SeanceHallConfiguration();