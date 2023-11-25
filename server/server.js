const path = require('path');
const express = require('express');
const routes = require('./routes/routes.js')
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const crypto = require('crypto');
const secret = crypto.randomBytes(64).toString('hex');

const cors = require('cors');

const axios = require('axios')

const PORT = 3001;

const app = express();

const Discogs = require('disconnect').Client;
const db = new Discogs().database();

const corsOptions = {
    origin: ['http://samigacon.ide.3wa.io:3000', 'http://localhost:3000'],
};

// Headers CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    console.log ('Access-Control-Allow-Origin')
    next();
});


// Middlewares
app.use(cors(corsOptions));
app.use(express.json())
app.use(express.static('public'))
app.use('/', routes.router)


// Create Session
app.use(session({
    store: new FileStore({
        path: './.sessions',
    }),
    secret: secret,
    resave: false,
    saveUninitialized: true
}));


// Launch
app.listen(PORT, () => {
    console.log(`Server is launching with port ${PORT}`);
});