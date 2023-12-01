const express = require('express');
const routes = require('./routes/routes.js');
const path = require('path');

const session = require('express-session');
const FileStore = require('session-file-store')(session);

const axios = require('axios');

const crypto = require('crypto');
const secretKey = "testKey-JFEOJFOPJZE0FDHOHFJHOQHVCOISDHFOIZHVOIHDVHSODIHVDSOIVODHSI";
console.log('Clé secrète générée :', secretKey);

const PORT = 3001;

const app = express();


// CORS Configuration
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://samigacon.ide.3wa.io:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});


// User Session
app.use(session({
    store: new FileStore({
        path: './.sessions',
        ttl: 2 * 60 * 60 * 1000, // 2 Hours Before Cleaning Unused Sessions
    }),
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }, // Duration Session - 1 Hours
}));


// Middlewares
app.use(express.json());
app.use(express.static('public'));
app.use('/', routes.router);


// Discogs
const dotenv = require('dotenv');
dotenv.config();

const discogsApiKey = process.env.discogsApiKey;
const discogsApiSecret = process.env.discogsApiSecret;

const Discogs = require('disconnect').Client;
const db = new Discogs().database();
const dis = new Discogs('MyUserAgent/1.0');
const col = new Discogs().user().collection();
const config = new Discogs().setConfig({outputFormat: 'html'});
const token = new Discogs({userToken: 'BRVUUsxvwpJnbYFpYaZyXEuHTeTcplNCadiruXBU'});
const data = new Discogs({
	consumerKey: discogsApiKey, 
	consumerSecret: discogsApiSecret
});


// Initialize OAuth Authentication
app.get('/authorize', function(req, res){
    const oAuth = new Discogs().oauth();
    console.log("oAuth Init : " + JSON.stringify(oAuth));
    oAuth.getRequestToken(
        'kzwaXswmrokVpsgrxEdm', 
        'oRraKrTFCIotmweTGYgAaMarsdFVwIFA', 
        'http://samigacon.ide.3wa.io:3001/callback', 
        function(err, requestData){
            if (err) {
                console.error('Error During Request Token Request:', err);
                return res.status(500).send('Server Error');
            }
            req.session.requestData = requestData;
            res.redirect(requestData.authorizeUrl);
        }
    );
});

// Discogs Response and Token Access
app.get('/callback', function(req, res) {
    const { oauth_verifier } = req.query;
    const requestData = req.session.requestData;
    console.log("requestData : " + JSON.stringify(requestData));
    if (!requestData || !oauth_verifier) {
        return res.status(400).send("OAuth Information Required is missing.");
    }
    const oAuth = new Discogs(requestData).oauth();
    console.log("oAuth Response : " + JSON.stringify(oAuth));
    oAuth.getAccessToken(
        oauth_verifier, 
        function(err, accessData) {
            if (err) {
                console.error('Error Obtaining Access Token', err);
                return res.status(500).send('Server Error');
            }
            req.session.accessData = accessData;
            res.send('Access Token Received!');
        }
    );
});

// Using Access Token for User Information with Discogs API
app.get('/identity', function(req, res){
    const accessData = req.session.accessData;
    console.log("accessData : " + JSON.stringify(accessData));
    if (!accessData) {
        return res.status(400).send("OAuth Data Access missing.");
    }
    const dis = new Discogs(accessData);
    console.log("Discogs(accessData) : " + JSON.stringify(dis));
    dis.getIdentity(function(err, data){
        if (err) {
            console.error('Error Retrieving Identity:', err);
            return res.status(500).send('Server Error');
        }
        res.send(data);
    });
});


// Launch
app.listen(PORT, () => {
    console.log(`Server is launching with port ${PORT}`);
});