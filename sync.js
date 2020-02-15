const express = require('express');
const app = express();

class Login {
    constructor() {
        app.post('/createBookmarkStore', (req, res) => {
            this.createBookmarkStore(req, res);
        });

        app.post('/resetEncryptionKey', (req, res) => {
            this.resetEncryptionKey(req, res);
        })
    }

    createBookmarkStore(req, res) {
        
    }

    resetEncryptionKey(req, res) {

    }
}

exports.app = app;
new Login();