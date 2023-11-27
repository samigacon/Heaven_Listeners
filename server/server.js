const express = require('express');
const routes = require('./routes/routes.js');

const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const axios = require('axios');

const crypto = require('crypto');
const secret = crypto.randomBytes(64).toString('hex');

const cors = require('cors');

const PORT = 3001;

const app = express();


// CORS Configuration
app.use(cors({
    origin: 'http://samigacon.ide.3wa.io:3000' 
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://samigacon.ide.3wa.io:3000');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});


// Other Middlewares
app.use(express.json())
app.use(express.static('public'))
app.use('/', routes.router)


// Discogs
const Discogs = require('disconnect').Client;
const db = new Discogs().database();
const dis = new Discogs('MyUserAgent/1.0');
const col = new Discogs().user().collection();
const config = new Discogs().setConfig({outputFormat: 'html'});
const token = new Discogs({userToken: 'BRVUUsxvwpJnbYFpYaZyXEuHTeTcplNCadiruXBU'});
const data = new Discogs({
	consumerKey: 'kzwaXswmrokVpsgrxEdm', 
	consumerSecret: 'oRraKrTFCIotmweTGYgAaMarsdFVwIFA'
});

app.get('/message', function(req, res){
    console.log("Bouton Cliqué !");
    res.send({ message: 'Bouton Cliqué !' });
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


/*
const dotenv = require('dotenv');
dotenv.config();

const discogsApiKey = process.env.discogsApiKey;
const discogsApiSecret = process.env.discogsApiSecret;
*/

app.get('/authorize', function(req, res){
	const oAuth = new Discogs().oauth();
	oAuth.getRequestToken(
		'kzwaXswmrokVpsgrxEdm', 
		'oRraKrTFCIotmweTGYgAaMarsdFVwIFA', 
		'http://samigacon.ide.3wa.io:3001', 
		function(err, requestData){
		    req.session.requestData = requestData;
			res.redirect(requestData.authorizeUrl);
		}
	);
});

app.get('/callback', function(req, res){
	const oAuth = new Discogs(requestData).oauth();
	oAuth.getAccessToken(
		req.query.oauth_verifier,
		function(err, accessData){
		    req.session.accessData = accessData;
			res.send('Received access token!');
		}
	);
});


/*
// Exemple Discogs
db.getRelease(176126, function(err, data){
	console.log(data);
});
*/

/*
// Endpoint pour effectuer des requêtes vers le serveur Discogs

const dotenv = require('dotenv');
dotenv.config();

app.get('/api/discogs/:endpoint', async (req, res) => {
    const endpoint = req.params.endpoint;
    const query = req.query.q;



    const discogsUrl = `https://api.discogs.com/${endpoint}?q=${query}&key=${discogsApiKey}&secret=${discogsApiSecret}`;

    try {
        const response = await axios.get(discogsUrl);

        if (response.status === 200) {
            res.json(response.data);
        } else {
            throw new Error('HTTP Not Ok');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Query Error' });
    }
});
*/


// Launch
app.listen(PORT, () => {
    console.log(`Server is launching with port ${PORT}`);
});