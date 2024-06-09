import { Data } from './data.js'

class Main {
    constructor() {
        this.apiData = new Data();

        this.dateNav = document.querySelector('.date-picker-wrapper');
        this.days = [];
        this.weeksDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
        this.currentDate = '';

        this.main = document.getElementById('main');
        this.loginBtn = document.getElementById('loginBtn');
        this.data = {};
        this.halls = [];
        this.films = [];
        this.seances = []

        this.addEventListeners();
        this.createDateNav();
        this.initList();
    }

    addEventListeners() {
        if (this.loginBtn) {
            this.loginBtn.addEventListener('click', (e) => {
                e.preventDefault();
                document.location = './login.html';
            })
        }
    }

    createDateNav() {
        this.dateNav.innerHTML += this.getWeeksDays();
        this.pickDate();
        this.clickNext();
    }

    getWeeksDays() {
        let d = new Date();
        let n = d.getDay();
        return `
            <ul class="date-picker">
                <li class="date-item date-item-active" data-date="${d.toISOString().slice(0, 10)}">
                    <a class="date-item-link" href="#">Сегодня <br> ${this.weeksDays[n]}, ${d.getDate()}</a>
                </li>
                <li class="date-item" data-date="${new Date(d.setDate(d.getDate() + 1)).toISOString().slice(0, 10)}">
                    <a class="date-item-link" href="#">${n < 6 ? this.weeksDays[++n] : this.weeksDays[n = 0]}, <br> ${d.getDate()}</a>
                </li>
                <li class="date-item" data-date="${new Date(d.setDate(d.getDate() + 1)).toISOString().slice(0, 10)}">
                    <a class="date-item-link" href="#">${n < 6 ? this.weeksDays[++n] : this.weeksDays[n = 0]}, <br> ${d.getDate()}</a>
                </li>
                <li class="date-item" data-date="${new Date(d.setDate(d.getDate() + 1)).toISOString().slice(0, 10)}">
                    <a class="date-item-link" href="#">${n < 6 ? this.weeksDays[++n] : this.weeksDays[n = 0]}, <br> ${d.getDate()}</a>
                </li>
                <li class="date-item" data-date="${new Date(d.setDate(d.getDate() + 1)).toISOString().slice(0, 10)}">
                    <a class="date-item-link" href="#">${n < 6 ? this.weeksDays[++n] : this.weeksDays[n = 0]}, <br> ${d.getDate()}</a>
                </li>
                <li class="date-item" data-date="${new Date(d.setDate(d.getDate() + 1)).toISOString().slice(0, 10)}">
                    <a class="date-item-link" href="#">${n < 6 ? this.weeksDays[++n] : this.weeksDays[n = 0]}, <br> ${d.getDate()}</a>
                </li>
                <li class="date-item" data-date="${new Date(d.setDate(d.getDate() + 1)).toISOString().slice(0, 10)}">
                    <a class="date-item-link" href="#">${this.weeksDays[++n]}, <br> ${d.getDate()}</a>
                </li>
                <li class="date-item arrow-next">
                    <a class="date-item-link" href="#">></a>
                </li>
            </ul>
          `
    }

    pickDate() {
        this.days = Array.from(document.querySelectorAll('.date-item'));
        this.days[7].style.display = 'none';

        this.days.forEach(day => {
            if (day.innerHTML.includes('Сб') || day.innerHTML.includes('Вс')) {
                day.classList.add('weekend');
            };
            day.addEventListener('click', (e) => {
                let target = e.target;
                if (target.closest('.arrow-next')) {
                    return;
                };

                // Далем недоступными сеансы, время которых прошло
                let allSeances = document.querySelectorAll('.movie-table-item-link')
                for (let seance of allSeances) {
                    if (target.textContent.includes('Сегодня')) {
                        if (seance.textContent < new Date().toLocaleTimeString().slice(0, 5)) {
                            seance.closest('.movie-table-item').classList.add('disabled');
                        }
                    } else {
                        seance.closest('.movie-table-item').classList.remove('disabled');
                    }
                };

                this.days.forEach(s => s.classList.remove('date-item-active'));
                target.closest('.date-item').classList.add('date-item-active');
            })
        })
    }

    clickNext() {
        let arrow = document.querySelector('.arrow-next');
        arrow.addEventListener('click', (e) => {
            let index = this.days.findIndex(s => s.closest('.date-item').classList.contains('date-item-active'));
            if (index < 5) {
                this.days[0].style.display = 'block';
                this.days[6].style.display = 'none';
                this.days[index].classList.remove('date-item-active');
                this.days[index + 1].classList.add('date-item-active');
            } else if (index === 5) {
                this.days[0].style.display = 'none';
                this.days[6].style.display = 'block';
                this.days[index].classList.remove('date-item-active');
                this.days[index + 1].classList.add('date-item-active');
            } else if (index === 6) {
                this.days[0].style.display = 'block';
                this.days[6].style.display = 'none';
                this.days[6].classList.remove('date-item-active');
                this.days[0].classList.add('date-item-active');
            }
        })
    }

    async initList() {
        this.data = await this.apiData.getAllData();
        if (this.data.success) {
            this.halls = this.data.result.halls;
            this.films = this.data.result.films;
            this.seances = this.data.result.seances;

            for (let film of this.films) {
                let filmCopmonent = this.createFilmCopmonent(film); 
                if (filmCopmonent) {
                    this.main.innerHTML += filmCopmonent;
                }
            };

            let seancesList = Array.from(document.querySelectorAll('.movie-table-item'));
            seancesList.forEach(seance => {
                seance.addEventListener('click', (e) => this.seanceClick(e))
            });
        } else {
            alert(res.error);
        }
    }

    createFilmCopmonent(film) {
        let hallsSeances = '';
        let currentTime = new Date().toLocaleTimeString().slice(0, 5);
        if (this.halls.length > 0) {
            for (let hall of this.halls) {
                if (hall.hall_open) {
                    let currentFilmSeances = this.seances.filter(seance => seance.seance_hallid === hall.id && seance.seance_filmid === film.id);
                    if (currentFilmSeances.length > 0) {
                        currentFilmSeances.sort(function (a, b) {
                            if (a.seance_time > b.seance_time) {
                                return 1;
                            }
                            if (a.seance_time < b.seance_time) {
                                return -1;
                            }
                            return 0;
                        });
        
                        hallsSeances += `
                            <div class="hall id=${hall.id}">${hall.hall_name}</div>
                            <ul class="movie-table">
                        `;
        
                        currentFilmSeances.forEach(seance => {
                            hallsSeances += `
                                <li class="movie-table-item ${seance.seance_time < currentTime ? 'disabled' : ''}" id="${seance.id}">
                                    <a class="movie-table-item-link" href="">${seance.seance_time}</a>
                                </li>
                            `;
                        });
                        hallsSeances += `</ul>`;
                    }    
                }
            }
        }

        if (!hallsSeances) {
            return;
        } else {
            return `
            <section class="movie-container">
                <div class="movie" id="${film.id}">
                    <img class="movie-poster" src="${film.film_poster}"
                        alt="Постер к фильму ${film.film_name}">
                    <div class="movie-description">
                        <h2 class="movie-title">${film.film_name}</h2>
                        <p class="movie-text">${film.film_description}</p>
                        <p class="movie-duration">${film.film_duration} ${film.film_origin}</p>
                    </div>
                </div>
                ${hallsSeances}
            </section>`;
        }
    }

    seanceClick(e) {
        e.preventDefault();
        this.currentDate = document.querySelector('.date-item-active').dataset.date;
        let seanceId = e.target.closest('.movie-table-item').id;
        document.location = `./seance.html?seanceId=${seanceId}&date=${this.currentDate}`;
    }
}

new Main();