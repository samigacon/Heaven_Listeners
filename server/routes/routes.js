const express = require("express")

//Controllers
const favoritesController = require('../controllers/favorites.js')
const historicController = require('../controllers/historic.js')
const playlistsController = require('../controllers/playlists.js')
const userController = require('../controllers/user.js')


// Access to Admin Routes
function isAuthenticated(req, res, next) {
    if (req.session && req.session.connected) {
        return next();
    } else {
        return res.status(401).json({error: '401 Unauthorized'});
    }
}


// Routes
const router = express.Router()



// Admin Routes



module.exports.router = router