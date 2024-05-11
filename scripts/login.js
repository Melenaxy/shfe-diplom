import { Data } from './data.js'

class Login {
    constructor() {
        this.apiData = new Data();
        this.loginForm = document.getElementById('loginForm');
        this.loginForm.addEventListener('submit', (e) => this.onSubmit(e))
    }

    onSubmit(e) {
        e.preventDefault();
        let formData = new FormData(document.getElementById('loginForm'));
        this.apiData.Login(formData).then(res => {
            if (res.success) {                
                document.location='./admin.html';
            } else {
                alert(res.error);
            }
        })
    }
}

new Login();