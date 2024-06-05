import { Data } from './data.js'

class Admin {
    constructor() {
        this.apiData = new Data();
        this.createHallModal = document.getElementById('createHallModal');
        this.createHallModal.addEventListener('click', ({ currentTarget, target }) => {
            const isClickedOnBackdrop = target === currentTarget;

            if (isClickedOnBackdrop) {
                currentTarget.close();
            }
        })
    }
}

new Admin();