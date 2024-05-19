import { Data } from './data.js'

class SeanceHallConfiguration {
    constructor() {
        this.apiData = new Data();

        this.params = window.location.href.split("?")[1];
        this.seanceId = Number(this.params.split('&')[0].split('=')[1]);
        this.date = this.params.split('&')[1].split('=')[1];
        this.tickets = [];

        this.hallConfig = document.querySelector('.halls-row-wrapper');
        this.seats = [];
        this.bookBtn = document.querySelector('.book-btn');
        this.getSeanceDiscription();
        this.getHallConfig();
    }

    getSeanceDiscription() {
        this.apiData.getAllData().then(res => {
            if (res.success) {
                this.seance = res.result.seances.find(s => s.id === this.seanceId);
                document.querySelector('.seance-start-time').textContent = this.seance.seance_time;
                this.film = res.result.films.find(f => f.id === this.seance.seance_filmid);
                document.querySelector('.seance-header-text').textContent = this.film.film_name;
                this.hall = res.result.halls.find(h => h.id === this.seance.seance_hallid);
                document.querySelector('.seance-hall-name').textContent = this.hall.hall_name;
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
                    text += `<div class="halls-seat ${this.rows[i][j]}-seat" 
                    data-ticket_row="${i + 1}" 
                    data-ticket_place="${j + 1}" 
                    data-coast="${this.rows[i][j] === 'standart' ? this.hall.hall_price_standart : this.hall.hall_price_vip}"></div>`
                }
                this.hallConfig.innerHTML += text + `</div>`;
            };
            document.querySelector('.standart-seat-price').textContent = `(${this.hall.hall_price_standart}руб)`;
            document.querySelector('.vip-seat-price').textContent = `(${this.hall.hall_price_vip}руб)`;
            this.addEventListeners();
        } else {
            alert(res.error);
        }
    }

    addEventListeners() {
        this.seats = Array.from(this.hallConfig.querySelectorAll('.halls-seat'));
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
                })
            })
        };

        this.bookBtn.addEventListener('click', (e) => {
            let selected = Array.from(this.hallConfig.querySelectorAll('.selected-seat'));
            for (let seat of selected) {
                this.tickets.push({
                    row: Number(seat.dataset.ticket_row),
                    place: Number(seat.dataset.ticket_place),
                    coast: Number(seat.dataset.coast),
                })
            };

            let model = new FormData();
            model.set("seanceId", this.seanceId);
            model.set("ticketDate", this.date);
            model.set("tickets", JSON.stringify(this.tickets));

            this.apiData.getTicketsBooking(model).then(res => {
                if (res.success)
                localStorage.setItem('tickets', JSON.stringify(res.result));
                document.location='./payment.html'
            })
        })
    }
}

let seanceHallconfig = new SeanceHallConfiguration();