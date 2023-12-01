import React from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

export default function HomePage () {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    
    // Keep Session if Connected
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
        <div className="homepage">
            <h1>Home</h1>
            <h2 className="button-playlists">Playlists</h2>
            {isLoggedIn ? (
                <div className="home-playlists">
                    <div className="last-playlists">Last Playlist 1</div>
                </div>
            ) : (
                <div className="home-playlists">
                    <div className="last-playlists">Please register and login in profile to access to playlists</div>
                </div>
            )}
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