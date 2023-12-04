import React from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

export default function LibraryPage () {
    const [message, setMessage] = React.useState('');
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [playlists, setPlaylists] = React.useState([]);
    
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
        // Collect Playlists
        fetchPlaylists();
    }, []);
    
    const fetchPlaylists = async () => {
        try {
            const response = await fetch('http://samigacon.ide.3wa.io:3001/playlists');
            if (response.ok) {
                const data = await response.json();
                console.log('data : ' + JSON.stringify(data));
                setPlaylists(data);
                console.log('playlists : ' + JSON.stringify(playlists));
            }
        } catch (error) {
            console.error('Error Fetching Playlists:', error);
        }
    };
    
    return (
        <>
            <h1>Library</h1>
            {isLoggedIn ? (
                <div className="library-playlists">
                    <button className="add-playlist"><Link to="/playlist-new">New Playlist</Link></button>
                    {playlists.map((allPlaylists, index) => (
                        <div className="library-list" key={index}>
                            {allPlaylists.map((playlist) => (
                                <div key={playlist.Playlist_ID}>
                                    <Link to={`/playlist/${playlist.Playlist_ID}/${playlist.Name}`}>{playlist.Name}</Link>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ) : (
                <h2>Please register and log in to access playlists</h2>
            )}
        </>
    )
}