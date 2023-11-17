import React from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

export default function PlaylistChangePage () {
    
    
    
    return (
        <>
            <h1>Rename Playlist</h1>
             <div className="search-bar renaming-playlist">
                <input type="text" placeholder="Put the new name"/>
                <button><Link to="/library">Rename</Link></button>
            </div>
        </>
    )
}