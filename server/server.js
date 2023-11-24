const path = require('path');
const express = require('express');
const routes = require('./routes/routes.js')
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const crypto = require('crypto');
const secret = crypto.randomBytes(64).toString('hex');

const cors = require('cors');

const PORT = 3001;

const app = express();

const Discogs = require('disconnect').Client;
const db = new Discogs().database();

const corsOptions = {
  origin: 'http://samigacon.ide.3wa.io:3000',
};


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


// Discogs
db.getRelease(176126, function(err, data){
	console.log(data);
});


// Launch
app.listen(PORT, () => {
    console.log(`Server is launching with port ${PORT}`);
});