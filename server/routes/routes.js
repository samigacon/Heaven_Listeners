const express = require("express")
const session = require('express-session');


/*
//Controllers
const favoritesController = require('../controllers/favorites.js')
const historicController = require('../controllers/historic.js')
const playlistsController = require('../controllers/playlists.js')
const userController = require('../controllers/user.js')
*/


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

router.get('/', (req, res) => {
    console.log('Server is connected !');
});



// Admin Routes



/*
// Logout
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Erreur lors de la déconnexion:', err);
        }
        res.redirect('/login');
    });
});
*/

module.exports.router = router