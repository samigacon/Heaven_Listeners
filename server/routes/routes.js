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

router.post('/authApi/user/register', userController.register)
router.post('/authApi/user/login', userController.login) 
router.get('/authApi/user/logout', userController.logout) 

/*
/// Admin Routes ///
router.get('/auth/user/playlists-add', isAuthenticated, playlistsController.add)
router.get('/auth/user/playlists-delete', isAuthenticated, playlistsController.remove)
router.get('/auth/user/playlists-rename', isAuthenticated, playlistsController.rename)
router.get('/auth/user/playlists', isAuthenticated, playlistsController.modify)
*/


module.exports.router = router;