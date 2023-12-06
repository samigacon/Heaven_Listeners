const express = require("express");

// Controllers
const userController = require('../controllers/user.js');
const playlistsController = require('../controllers/playlists.js');

// Routes
const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login); 
router.post('/logout', userController.logout);

router.get('/playlists', playlistsController.playlists);

router.post('/playlists-new', playlistsController.newPlaylist);
router.post('/playlists-delete', playlistsController.removePlaylist);
router.post('/playlists-rename', playlistsController.renamePlaylist);

router.post('/tracks', playlistsController.getTracksInPlaylist);
router.post('/track-add', playlistsController.addTrackToPlaylist);
router.post('/track-delete', playlistsController.removeTrackFromPlaylist);

module.exports.router = router;