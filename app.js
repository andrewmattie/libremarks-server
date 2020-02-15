const express = require('express');
const app = express();
const passport = require('passport');
const mongoose = require('mongoose');
const localStrategy = LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const User = require('./models/User');

const _ = require('./login');

const securityKey = process.env.SECKEY;
const encryptionKey = process.env.ENCRYPT_KEY;
const jwt_issuer = process.env.JWT_ISSUER;

class App {
    constructor() {
        this.setupExpress();
        this.setupMongoose();
        this.setupPassport();
        this.startServer();
    }

    setupExpress() {
        app.use(cookieParser());
        app.use(session({
            secret: securityKey,
            resave: true,
            saveUninitialized: false
        }));
    }

    setupMongoose() {
        mongoose.Promise = global.Promise;

        const dbuser = process.env.DB_USER;
        const dbpassword = process.env.DB_PASS;

        mongoose.connect(process.env.DB_URL, { 
            useNewUrlParser: true,
            user: dbuser,
            pass: dbpassword,
            useUnifiedTopology: true
        }).catch(error => {
            console.log(`Mongoose connection error: ${error}`);
        });
    
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', onConnected);
    
        function onConnected() {
            console.log('MongoDB connection established.');
        }
    }

    setupPassport() {
        app.use(passport.initialize());
        app.use(passport.session());
        
        passport.use('local-email', new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            Cryption.encryptWeakly(encryptionKey, email).then(encryptedEmail => {
                User.findOne({ email: encryptedEmail }, (err, user) => {
                    if (err) { return done(err); }
                    if (!user) { return done(null, false); }
        
                    User.authenticate()(user.email, password).then(() => {
                        return done(null, user);
                    }).catch(error => {
                        return done(error, false);
                    });
                });
            });
        }));

        passport.serializeUser(User.serializeUser());
        passport.deserializeUser(User.deserializeUser());
    }

    startServer() {
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`LibreMarks server started on port ${port}`);
        })
    }
}

new App();