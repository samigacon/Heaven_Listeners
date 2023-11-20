const express = require("express")
const session = require('express-session');
const bcrypt = require('bcrypt');

//Controllers
const favoritesController = require('../controllers/favorites.js')
const historicController = require('../controllers/historic.js')
const playlistsController = require('../controllers/playlists.js')
const userController = require('../controllers/user.js')



// Routes
const router = express.Router()

router.get('/', (req, res) => {
    console.log('Server is connected !');
    res.status(200).json({ message: 'Server is connected!' });
});


// Access if Connected
function isAuthenticated(req, res, next) {
    if (req.session && req.session.connected) {
        console.log('You can enter as you are connected !');
        return next();
    } else {
        console.log('401 Unauthorized - You are not connected !');
        return res.status(401).json({error: '401 Unauthorized'});
    }
}


/// Admin Routes ///

// Register




// Connection
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === req.body.username && password === req.body.password) {
        req.session.connected = true;
        console.log('Authentication Successful');
        res.status(200).json({ message: 'Authentication Successful' });
    } else {
        console.log('Authentication Failed');
        res.status(401).json({ message: 'Authentication Failed' });
    }
});


// Disconnection
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
        console.error('Error Logging Out', err);
        res.status(500).json({ message: 'Error Logging Out' });
        }   else {
        console.log('Logged Out Successfully');
        res.status(200).json({ message: 'Logged Out Successfully' });
        }
    });
});


module.exports.router = router;