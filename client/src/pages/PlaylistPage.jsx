import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

export default function PlaylistPage () {
    const { id, name} = React.useParams();
    
    return (
        <>
            <h1>Playlist</h1>
            <div>
                <p>Name: {name}</p>
            </div>
            <button className="rename-playlist"><Link to="/playlist-rename">Rename Playlist</Link></button>
            <button className="delete-playlist"><Link to="/library">Delete Playlist</Link></button>
        </>
    );
}