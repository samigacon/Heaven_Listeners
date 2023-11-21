const path = require('path');
const express = require('express');
const routes = require('./routes/routes.js')
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const { Client } = require('disconnect');

const crypto = require('crypto');
const secret = crypto.randomBytes(64).toString('hex');

const PORT = 3001;

const app = express();

app.use(express.json())
app.use(express.static('public'))
app.use('/', routes.router)


app.get('/release/:id', (req, res) => {
    const discogs = new Client();
    const db = discogs.database();
    db.getRelease(req.params.id, (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(data);
    });
});


// Create Session
app.use(session({
    store: new FileStore({
        path: './.sessions',
    }),
    secret: secret,
    resave: false,
    saveUninitialized: true
}));


app.listen(PORT, () => {
    console.log(`Server is launching with port ${PORT}`);
});