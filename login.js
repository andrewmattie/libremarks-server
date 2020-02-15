const express = require('express');
const app = express();

class Login {
    constructor() {
        app.post('/login', (req, res) => {
            this.login(req, res);
        });

        app.post('/register', (req, res) => {
            this.register(req, res);
        })
    }

    login(req, res) {
        
    }

    register(req, res) {

    }
}

exports.app = app;
new Login();