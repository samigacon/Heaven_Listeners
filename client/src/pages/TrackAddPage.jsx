import React from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function TrackAddPage () {
    const { Album_ID, Track_Title } = useParams();
    const [message, setMessage] = React.useState('');
    const [playlists, setPlaylists] = React.useState([]);
    
    // Collect Playlists
    React.useEffect(() => {
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
            // console.error('Error Fetching Playlists:', error);
        }
    };
    
    const handleAddTrack = async (Playlist_ID) => {
        // console.log("Playlist_ID : " + Playlist_ID);
        // console.log("Track_Title : " + Track_Title);
        try {
            const response = await fetch('http://samigacon.ide.3wa.io:3001/track-add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    playlistId: Playlist_ID,
                    trackTitle: Track_Title,
                }),
            });
            if (response.ok) {
                // console.log('Track Added');
                setMessage('Track Added');
            } else {
                // console.log('Track Adding Error' + ' ' + response.status + ' ' + response.statusText);
                setMessage('Track Adding Error');
            }
        } catch (error) {
            // console.error('Track Adding Query Error', error);
            setMessage('Track Adding Query Error.');
        }
    }
    
    return (
        <>
            <h1>Which Playlist to Add ?</h1>
            {/*First Loop for all Playlists*/}
            {playlists.map((allPlaylists, index) => (
                <div key={index}>
                    {/* Second Loop for Each Playlist*/}
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