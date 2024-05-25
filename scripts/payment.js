class Payment {
    constructor() {
        this.tickets = JSON.parse(localStorage.getItem('tickets'))
        this.header = document.querySelector('.section-payment-header');
        this.title = document.getElementById('title');
        this.places = document.getElementById('places');
        this.hall = document.getElementById('hall');
        this.seance = document.getElementById('seance');
        this.sum = document.getElementById('sum');

        this.bookBtn = document.getElementById('bookBtn');
        this.bookBtn.addEventListener('click', () => this.getQRCode());
        this.gqCodeWrapper = document.getElementById('gqCodeWrapper');
        this.qrcode;
        this.info = document.getElementById('info');

        this.showTicketsInfo();
    }

    showTicketsInfo() {
        let sum = 0;
        let places = ''
        for (let ticket of this.tickets) {
            sum += ticket.ticket_price;
            places += `ряд: ${ticket.ticket_row}, место: ${ticket.ticket_place}; `
        }
        this.title.textContent = this.tickets[0].ticket_filmname;
        this.places.textContent = places;
        this.hall.textContent = this.tickets[0].ticket_hallname;
        this.seance.textContent = this.tickets[0].ticket_time;
        this.sum.textContent = sum;

        this.qrcode = QRCreator(`
            Название фильма: ${this.tickets[0].ticket_filmname}
            Дата: ${this.tickets[0].ticket_date}
            Время: ${this.tickets[0].ticket_time}
            Зал: ${this.tickets[0].ticket_hallname}
            Места: ${places}
        `,
            {
                mode: -1,
                eccl: 0,
                version: -1,
                mask: -1,
                image: "PNG",
                modsize: 3,
                margin: 3
            });

    }

    getQRCode() {
        this.bookBtn.style.display = 'none';
        this.gqCodeWrapper.style.display = 'block';
        this.gqCodeWrapper.append(this.qrcode.result)
        this.sum.closest('.ticket-info').style.display = 'none';
        this.header.textContent = 'Электронный билет';
        this.info.textContent = 'Покажите QR-код нашему контроллеру для подтверждения бронирования.';
    }
}

new Payment()