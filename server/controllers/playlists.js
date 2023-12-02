const db = require('../models/database.js')
const bcrypt = require('bcrypt')

async function addPlaylist(req, res) {

}

async function removePlaylist(req, res) {

}

async function renamePlaylist(req, res) {
    try {
        const playlistId = req.params.playlistId;
        const newName = req.body.name;

        const query = 'UPDATE Playlist SET Name = ? WHERE Playlist_ID = ?';
        const values = [newName, playlistId];

        await db.query(query, values);

        res.json({ message: 'Playlist Renamed with Success' });
    } catch (error) {
        console.error('Playlist Renaming Error :', error);
        res.status(500).json({ error: 'Playlist Renaming Error' });
    }
}

module.exports.renamePlaylist = renamePlaylist;
