import React from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

export default function HomePage () {
    /*
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
    */
    
    return (
        <div className="homepage">
            <h1>Welcome to Heaven Listeners !</h1>
            {/*
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
            */}
        </div>
    )
}