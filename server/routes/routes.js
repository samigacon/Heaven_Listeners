const express = require("express")
const session = require('express-session');
const bcrypt = require('bcrypt');

//Controllers
const userController = require('../controllers/user.js')
const playlistsController = require('../controllers/playlists.js')
const favoritesController = require('../controllers/favorites.js')
const historicController = require('../controllers/historic.js')


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


// Routes
const router = express.Router()

router.post('/api/user/register', userController.register)
router.post('/api/user/login', userController.login) 
router.get('/api/user/logout', userController.logout) 


/// Admin Routes ///
router.get('/api/user/playlists', isAuthenticated, orderController.listForUser)


module.exports.router = router;