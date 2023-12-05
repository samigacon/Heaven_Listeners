import React from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function TrackAddPage () {
    const { Album_ID, Track_ID } = useParams();
    const [message, setMessage] = React.useState('');
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [playlists, setPlaylists] = React.useState([]);
    
    React.useEffect(() => {
        // Keep Session if Connected
        const localUserConnected = localStorage.getItem('userConnected');
        if (localUserConnected === 'true') {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
        // Collect Playlists
        fetchPlaylists();
    }, [playlists]);
    
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
    
    const handleAddTrack = async (Playlist_ID) => {
        try {
            const response = await fetch('http://samigacon.ide.3wa.io:3001/track-add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    playlistId: Playlist_ID,
                    trackId: Track_ID,
                }),
            });
            if (response.ok) {
                console.log('Track Added');
                setMessage('Track Added');
            } else {
                console.log('Track Adding Error' + ' ' + response.status + ' ' + response.statusText);
                setMessage('Track Adding Error');
            }
        } catch (error) {
            console.log('Track Adding Query Error', error);
            setMessage('Track Adding Query Error.');
        }
    }
    
    return (
        <>
            <h1>Which Playlist to Add ?</h1>
            {playlists.map((allPlaylists, index) => (
                <div key={index}>
                    {allPlaylists.map((eachPlaylist) => (
                        eachPlaylist.Playlist_ID && (
                        <div className="playlist-selection" key={eachPlaylist.Playlist_ID}>
                            <button onClick={() => handleAddTrack(eachPlaylist.Playlist_ID)} className="add-track">
                                <Link to="/library">Add to {eachPlaylist.Name}</Link>
                            </button>
                        </div>
                        )
                    ))}
                </div>
            ))}
            <button className="add-track"><Link to="/search">Return to Search</Link></button>
        </>
    )
}