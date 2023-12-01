import React from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

export default function LibraryPage () {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    
    React.useEffect(() => {
        // Initialize Session
        if (localStorage.getItem('userConnected') === null) {
            localStorage.setItem('userConnected', 'false');
        }
        // Keep Session if Connected
        const localUserConnected = localStorage.getItem('userConnected');
        if (localUserConnected === 'true') {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);
    
    return (
        <>
            <h1>Library</h1>
            {isLoggedIn ? (
                <div className="library-playlists">
                    <button className="add-playlist"><Link to="/playlist-add">Add Playlist</Link></button>
                    <div className="library-list"><Link to="/playlist">Playlist 1</Link></div>
                    <div className="library-list"><Link to="/playlist">Playlist 2</Link></div>
                </div>
            ) : (
                <h2>Please register and login in profile to access to playlists</h2>
            )}
            {/*
            <div className="library-history">History</div>
            <div className="library-favorites">Favorites</div>
            */}
        </>
    )
}