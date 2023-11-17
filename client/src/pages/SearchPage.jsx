import React from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

export default function SearchPage () {
    
    
    
    return (
        <>
            <h1>Search</h1>
            <div className="search-bar">
                <input type="text" placeholder="Searching by artist, track or album..."/>
                <button>Search</button>
            </div>
            <h2 className ="search-tag">Artists</h2>
            <div className="search-artist">
                <div className="artists"><Link to="/artist">Artist 1</Link></div>
            </div>
            <h2 className ="search-tag">Tracks</h2>
            <div className="search-track">
                <div className="tracks"><Link to="/track">Track 1</Link></div>
            </div>
            <h2 className ="search-tag">Albums</h2>
            <div className="search-album">
                <div className="albums"><Link to="/album">Album 1</Link></div>
            </div>
        </>
    )
}