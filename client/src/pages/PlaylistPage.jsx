import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function PlaylistPage () {
    const { Playlist_ID, Name } = useParams();
    const [tracks, setTracks] = React.useState([]);
    
    React.useEffect(() => {
        const fetchTracks = async () => {
            try {
                const response = await fetch('https://heaven-listeners-server.vercel.app/tracks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        playlistId: Playlist_ID,
                    }),
                });
    
                if (response.ok) {
                    const data = await response.json();
                    setTracks(data);
                } else {
                    // console.error('Error Fetching Tracks:', response.statusText);
                }
            } catch (error) {
                // console.error('Error Fetching Tracks:', error);
            }
        };
        fetchTracks();
    }, [Playlist_ID]);
    
    return (
       <>
            <h1>Playlist</h1>
            <h2>Name: {Name}</h2>
            <ul>
                {/*Get Only First Element of Playlist and Filter Empty Tracks*/}
                {tracks.filter((track) =>  track[0] && track[0].Title && track[0].Track_ID).map((track) => (
                    <li key={track[0].Track_ID}>
                        {track[0].Title}
                        <button className="delete-playlist"><Link to={`/track-delete/${Playlist_ID}/${track[0].Track_ID}`}>Delete Track</Link></button>
                    </li>
                ))}
            </ul>
            <button className="rename-playlist"><Link to={`/playlist-rename/${Playlist_ID}/${Name}`}>Rename Playlist</Link></button>
            <button className="delete-playlist"><Link to={`/playlist-delete/${Playlist_ID}/${Name}`}>Delete Playlist</Link></button>
        </>
    );
}
 
 