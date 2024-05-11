class SeanceHallConfiguration {
    constructor() {
        this.params = window.location.href.split("?")[1];
        fetch('https://shfe-diplom.neto-server.ru/hallconfig?seanceId=505&date=2023-12-01')
            .then(response => response.json())
            .then(data => console.log(data));
        this.seats = Array.from(document.querySelectorAll('.halls-seat'));
        this.seats.forEach(seat => {
            seat.addEventListener('click', (e) => {
                //e.preventDefault();
                let target = e.target;
                if (target.classList.contains('disabled-seat') || target.classList.contains('taken-seat') || target.closest('.seats-legend-wrapper')) {
                    return;
                } else {
                    target.classList.toggle('selected-seat');
                }
            })
        })
    }
}

let seanceHallconfig = new SeanceHallConfiguration();