import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function PlaylistPage () {
    const {Playlist_ID, Name} = useParams();
    
    return (
        <>
            <h1>Playlist</h1>
            <h2>Name: {Name}</h2>
            
            <button className="rename-playlist"><Link to={`/playlist-rename/${Playlist_ID}/${Name}`}>Rename Playlist</Link></button>
            <button className="delete-playlist"><Link to={`/playlist-delete/${Playlist_ID}/${Name}`}>Delete Playlist</Link></button>
        </>
    );
}