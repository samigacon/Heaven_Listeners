const express = require("express");
const session = require('express-session');
const bcrypt = require('bcrypt');


//Controllers
const userController = require('../controllers/user.js');

/*
const playlistsController = require('../controllers/playlists.js')
const favoritesController = require('../controllers/favorites.js')
const historicController = require('../controllers/historic.js')
*/


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
const router = express.Router();

router.get('/message', userController.hello);

router.post('/register', userController.register);
router.post('/login', userController.login); 
router.get('/logout', userController.logout);


/*
/// Admin Routes ///
router.get('/playlists-add', isAuthenticated, playlistsController.add)
router.get('/playlists-delete', isAuthenticated, playlistsController.remove)
router.get('/playlists-rename', isAuthenticated, playlistsController.rename)
router.get('/playlists', isAuthenticated, playlistsController.modify)
*/


module.exports.router = router;