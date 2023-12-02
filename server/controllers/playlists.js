const db = require('../models/database.js')
const bcrypt = require('bcrypt')

async function addPlaylist(req, res) {
    try {
        const { name, description, userId } = req.body;
        const creationDate = new Date();

        const query = 'INSERT INTO Playlist (Name, Description, Creation_Date, User_ID) VALUES (?, ?, ?, ?)';
        const values = [name, description, creationDate, userId];

        await db.query(query, values);

        res.status(201).json({ message: 'Playlist Added with Success' });
    } catch (error) {
        console.error('Playlist Addition Error :', error);
        res.status(500).json({ error: 'Playlist Addition Error' });
    }
}

async function removePlaylist(req, res) {
    try {
        const playlistId = req.params.playlistId;

        const query = 'DELETE FROM Playlist WHERE Playlist_ID = ?';
        const values = [playlistId];

        await db.query(query, values);

        res.json({ message: 'Playlist Deleted with Success' });
    } catch (error) {
        console.error('Playlist Deletion Error :', error);
        res.status(500).json({ error: 'Playlist Deletion Error' });
    }
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

async function addTrackToPlaylist(req, res) {
    try {
        const { playlistId, trackId } = req.body;

        const query = 'INSERT INTO Track_Playlist (Playlist_ID, Track_ID) VALUES (?, ?)';
        const values = [playlistId, trackId];

        await db.query(query, values);

        res.status(201).json({ message: 'Track Added with Success' });
    } catch (error) {
        console.error('Track Addition Error :', error);
        res.status(500).json({ error: 'Track Addition Error' });
    }
}

async function removeTrackFromPlaylist(req, res) {

}

module.exports.addPlaylist = addPlaylist;
module.exports.removePlaylist = removePlaylist;
module.exports.renamePlaylist = renamePlaylist;
module.exports.addTrackToPlaylist = addTrackToPlaylist;
module.exports.removeTrackFromPlaylist = removeTrackFromPlaylist;