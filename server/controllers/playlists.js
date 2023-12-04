const db = require('../models/database.js')

async function playlists(req, res) {
    try {
        const query = 'SELECT * FROM Playlist';
        const playlists = await db.query(query);
        res.json(playlists);
    } catch (error) {
        console.error('Error Fetching Playlists:', error);
        res.status(500).json({ error: 'Error Fetching Playlists' });
    }
}

async function newPlaylist(req, res) {
    try {
        const name = req.body.name;
        console.log(name)
        const creationDate = new Date();
        console.log(JSON.stringify(creationDate))

        const query = 'INSERT INTO Playlist (Name, Creation_Date) VALUES (?, ?)';
        const values = [name, creationDate];
        console.log(JSON.stringify(values));

        await db.query(query, values);
        
        console.log('message: Playlist Added with Success');
        res.status(201).json({ message: 'Playlist Added with Success' });
    } catch (error) {
        console.error('Playlist Addition Error :', error);
        res.status(500).json({ error: 'Playlist Addition Error' });
    }
}

async function removePlaylist(req, res) {
    try {
        const playlistId = req.body.playlistId;
        console.log("remove - playlistID : " + playlistId);

        const query = 'DELETE FROM Playlist WHERE Playlist_ID = ?';
        const values = [playlistId];
        console.log("remove - values : " + JSON.stringify(values));

        await db.query(query, values);
        
        console.log('message: Playlist Deleted with Success');
        res.json({ message: 'Playlist Deleted with Success' });
    } catch (error) {
        console.error('Playlist Deletion Error :', error);
        res.status(500).json({ error: 'Playlist Deletion Error' });
    }
}

async function renamePlaylist(req, res) {
    try {
        const playlistId = req.body.playlistId;
        console.log("rename - playlistID : " + playlistId);
        const newName = req.body.newName;
        console.log(newName);

        const query = 'UPDATE Playlist SET Name = ? WHERE Playlist_ID = ?';
        const values = [newName, playlistId];
        console.log("rename - values : " + JSON.stringify(values));

        await db.query(query, values);

        console.log('message: Playlist Renamed with Success');
        res.json({ message: 'Playlist Renamed with Success' });
    } catch (error) {
        console.error('Playlist Renaming Error :', error);
        res.status(500).json({ error: 'Playlist Renaming Error' });
    }
}

async function addTrackToPlaylist(req, res) {
    try {
        const playlistId = req.body.playlistId;
        const trackId = req.body.trackId;
        console.log(playlistId);
        console.log(trackId);

        const query = 'INSERT INTO Track_Playlist (Playlist_ID, Track_ID) VALUES (?, ?)';
        const values = [playlistId, trackId];

        await db.query(query, values);

        console.log('message: Track Added with Success');
        res.status(201).json({ message: 'Track Added with Success' });
    } catch (error) {
        console.error('Track Addition Error :', error);
        res.status(500).json({ error: 'Track Addition Error' });
    }
}

async function removeTrackFromPlaylist(req, res) {
    try {
        const playlistId = req.body.playlistId;
        const trackId = req.body.trackId;
        console.log(playlistId);
        console.log(trackId);

        const query = 'DELETE FROM Track_Playlist WHERE Playlist_ID = ? AND Track_ID = ?';
        console.log(query);
        const values = [playlistId, trackId];
        console.log(JSON.stringify(values));

        await db.query(query, values);

        res.json({ message: 'Track Deleted with Success' });
    } catch (error) {
        console.error('Track Deletion Error : ', error);
        res.status(500).json({ error: 'Track Deletion Error' });
    }
}

module.exports.playlists = playlists;
module.exports.newPlaylist = newPlaylist;
module.exports.removePlaylist = removePlaylist;
module.exports.renamePlaylist = renamePlaylist;
module.exports.addTrackToPlaylist = addTrackToPlaylist;
module.exports.removeTrackFromPlaylist = removeTrackFromPlaylist;