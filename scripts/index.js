import { Data } from './data.js'

class Main {
    constructor() {
        this.apiData = new Data();
        this.main = document.getElementById('main');
        this.loginBtn = document.getElementById('loginBtn');
        this.currentDate = '2023-12-01';
        this.data = {};
        this.halls = [];
        this.films = [];
        this.seances = []

        this.addEventListeners();
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

    async initList() {
        this.data = await this.apiData.getAllData();
        if (this.data.success) {
            this.halls = this.data.result.halls;
            this.films = this.data.result.films;
            this.seances = this.data.result.seances;

            for (let film of this.films) {
                this.main.innerHTML += this.createFilmCopmonent(film);
            }
            let seancesList = Array.from(document.querySelectorAll('.movie-table-item'));
            seancesList.forEach(seance => {
                seance.addEventListener('click', (e) => this.seanceClick(e))
            })
        } else {
            alert(res.error);
        }
    }

    createFilmCopmonent(film) {
        let hallsSeances = '';
        for (let hall of this.halls) {
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
                        <li class="movie-table-item" id="${seance.id}">
                            <a class="movie-table-item-link" href="">${seance.seance_time}</a>
                        </li>
                    `;
                });
            };
            hallsSeances += `</ul>`;
        }

        if (hallsSeances) {
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
        let seanceId = e.target.closest('.movie-table-item').id;
        document.location = `./seance.html?seanceId=${seanceId}&date=${this.currentDate}`;
    }
}

new Main();