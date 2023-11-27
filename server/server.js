const path = require('path');
const express = require('express');
const routes = require('./routes/routes.js');
const session = require('express-session');
const config = require('./.config');
const FileStore = require('session-file-store')(session);

const axios = require('axios');

const dotenv = require('dotenv');
dotenv.config();

const crypto = require('crypto');
const secret = crypto.randomBytes(64).toString('hex');

const PORT = 3001;

const app = express();

const Discogs = require('disconnect').Client;
const db = new Discogs().database();

// Middlewares
app.use(express.json())
app.use(express.static('public'))
app.use('/', routes.router)

// Discogs
db.getRelease(176126, function(err, data){
	console.log(data);
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Endpoint pour effectuer des requêtes vers le serveur Discogs
app.get('/api/discogs/:endpoint', async (req, res) => {
    const { endpoint } = req.params;
    const { query } = req.query;
    
    const discogsApiKey = process.env.discogsApiKey;
    const discogsApiSecret = process.env.discogsApiSecret;
  
    const discogsUrl = `https://api.discogs.com/${endpoint}&${query}?key=${discogsApiKey}&secret=${discogsApiSecret}`;
  
    try {
        const response = await axios.get(discogsUrl);
    
        if (response.status === 200) {
            const data = response.data;
            res.json(data);
        } else {
            throw new Error('HTTP Not Ok');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Query Error' });
    }
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


// Launch
app.listen(PORT, () => {
    console.log(`Server is launching with port ${PORT}`);
});