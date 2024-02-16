const express = require('express');
const routes = require('./routes/routes.js');
const path = require('path');

const session = require('express-session');
const FileStore = require('session-file-store')(session);

const axios = require('axios');

const crypto = require('crypto');
const secretKey = "Key-JFEOJFOPJZE0FDHOHFJHOQHVCOISDHFOIZHVOIHDVHSODIHVDSOIVODHSI";

const PORT = 3001;

const app = express();


// CORS Configuration
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://heaven-listeners-client.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, UPDATE, DELETE');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
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
dotenv.config({ path: './.env' });

const discogsApiKey = process.env.discogsApiKey;
const discogsApiSecret = process.env.discogsApiSecret;

const Discogs = require('disconnect').Client;
const db = new Discogs().database();
const dis = new Discogs('MyUserAgent/1.0');
const col = new Discogs().user().collection();
const config = new Discogs().setConfig({outputFormat: 'html'});
const data = new Discogs({
	consumerKey: discogsApiKey, 
	consumerSecret: discogsApiSecret
});

// Hello World
app.get('/', (req, res) => {
    res.send('Hello World!')
  })

// Initialize OAuth Authentication - Discogs Guide
app.get('/authorize', function(req, res){
    const oAuth = new Discogs().oauth();
    console.log("oAuth Init : " + JSON.stringify(oAuth));
    oAuth.getRequestToken(
        'kzwaXswmrokVpsgrxEdm', 
        'oRraKrTFCIotmweTGYgAaMarsdFVwIFA', 
        'https://heaven-listeners-server.vercel.app/callback', 
        function(error, requestData){
            if (error) {
                console.error('Error During Request Token Request:', error);
                return res.status(500).send('Server Error');
            }
            req.session.requestData = requestData;
            res.redirect(requestData.authorizeUrl);
        }
    );
});

// Discogs Response and Token Access - Discogs Guide
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
        function(error, accessData) {
            if (error) {
                console.error('Error Obtaining Access Token', error);
                return res.status(500).send('Server Error');
            }
            req.session.accessData = accessData;
            res.send('Access Token Received!');
        }
    );
});

// Using Access Token for User Information with Discogs API - Discogs Guide
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


// Access to Database
app.get('/api/discogs/search', async (req, res) => {
    try {
        // With Secret Key
        const response = await axios.get(`https://api.discogs.com/database/search?q=${req.query.q}&key=${discogsApiKey}&secret=${discogsApiSecret}`);
        res.json(response.data);
    } catch (error) {
        console.error('Query Error Discogs:', error);
        res.status(500).send('Query Error Discogs');
    }
});

// Access to Releases
app.get('/api/discogs/releases', async (req, res) => {
    try {
        // With Secret Key
        const response = await axios.get(`https://api.discogs.com/masters/${req.query.q}&key=${discogsApiKey}&secret=${discogsApiSecret}`);
        res.json(response.data);
    } catch (error) {
        console.error('Query Error Discogs:', error);
        res.status(500).send('Query Error Discogs');
    }
});


// Launch
app.listen(PORT, () => {
    console.log(`Server is launching with port ${PORT}`);
});