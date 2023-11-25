import React from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

export default function HomePage () {
    
    
    
    return (
        <div className="homepage">
            <h1>Home</h1>
            <h2 className="button-playlists">Playlists</h2>
            <div className="home-playlists">
                <div className="last-playlists">Last Playlist 1</div>
            </div>
            {/* History and Favorites after Playlist
            <h2 className="button-history">History</h2>
            <div className="home-history">
                <div className="last-hhistory">Last History 1</div>
            </div>
            <h2 className="button-favorites">Favorites</h2>
            <div className="home-favorites">
                <div className="last-favorites">Last Favorite 1</div>
            </div>
            */}
        </div>
    )
}