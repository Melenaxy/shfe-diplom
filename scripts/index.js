import { Data } from './data.js'

class Main {
    constructor() {
        console.log('test');
        this.apiData = new Data();
        this.main = document.getElementById('main');
        this.loginBtn = document.getElementById('loginBtn');
        this.data = {};

        this.addEventListeners();
        //this.initList();
    }

    addEventListeners() {
        if (this.loginBtn) {
            this.loginBtn.addEventListener('click', (e) => {
                e.preventDefault();
                document.location='./login.html';
            })
        }
    }

    async initList() {
        this.data = await this.apiData.getAllData();
        if (this.data.success) {
            console.log(this.data.result);

            for (let film of this.data.result.films) {
                this.main.innerHTML += this.createFilmCopmonent(film);
            }
        } else {
            alert(res.error);
        }
    }

    createFilmCopmonent(film) {
        return `
            <section class="movie-container">
                <div class="movie" id="film.id">
                    <img class="movie-poster" src="${film.film_poster}"
                        alt="Постер к фильму ${film.film_name}">
                    <div class="movie-description">
                        <h2 class="movie-title">${film.film_name}</h2>
                        <p class="movie-text">${film.film_description}</p>
                        <p class="movie-duration">${film.film_duration} ${film.film_origin}</p>
                    </div>
                </div>
                <div class="hall hall-1">Зал 1</div>
                <ul class="movie-table table-1">
                    <li class="movie-table-item">10:20</li>
                    <li class="movie-table-item">14:10</li>
                    <li class="movie-table-item">18:40</li>
                    <li class="movie-table-item">22:00</li>
                </ul>
                <div class="hall hall-2">Зал 2</div>
                    <ul class="movie-table table-2">
                            <li class="movie-table-item">11:15</li>
                            <li class="movie-table-item">14:40</li>
                            <li class="movie-table-item">16:00</li>
                            <li class="movie-table-item">18:30</li>
                            <li class="movie-table-item">21:00</li>
                            <li class="movie-table-item">23:30</li>
                    </ul>
            </section>
        `
    }
}

new Main();