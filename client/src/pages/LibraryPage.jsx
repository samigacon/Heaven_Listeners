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
        const fetchPlaylists = async () => {
            try {
                const response = await fetch('http://samigacon.ide.3wa.io:3001/playlists');
                if (response.ok) {
                    const data = await response.json();
                    setPlaylists(data);
                }
            } catch (error) {
                console.error('Error Fetching Playlists:', error);
            }
        };
        fetchPlaylists();
    }, [playlists]);
    
    return (
        <>
            <h1>Library</h1>
            {isLoggedIn ? (
                <div className="library-playlists">
                    <button className="add-playlist"><Link to="/playlist-new">New Playlist</Link></button>
                    {/* First loop in the group of all playlists collected*/}
                    {playlists.map((allPlaylists, index) => (
                        <div key={index}>
                            {/* Second loop in each playlist */}
                            {allPlaylists.map((eachPlaylist) => (
                                // If Playlist_ID exists
                                eachPlaylist.Playlist_ID && (
                                <div className="library-list" key={eachPlaylist.Playlist_ID}>
                                    <Link to={`/playlist/${eachPlaylist.Playlist_ID}/${eachPlaylist.Name}`}>{eachPlaylist.Name}</Link>
                                </div>
                                )
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