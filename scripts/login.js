import { Data } from './data.js'

class Login {
    constructor() {
        console.log('login');
        this.apiData = new Data();
        this.loginForm = document.getElementById('loginForm');
        this.loginForm.addEventListener('submit', (e) => this.onSubmit(e))
    }

    onSubmit(e) {
        e.preventDefault();
        let formData = new FormData(document.getElementById('loginForm'));
        this.apiData.Login(formData).then(res => {
            console.log(res);
            if (res.success) {                
                document.location='./index-admin.html';
            } else {
                alert(res.error);
            }
        })
    }
}

new Login();