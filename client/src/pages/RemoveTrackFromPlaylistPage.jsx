import React from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function RemoveTrackFromPlaylistPage () {
    const {Playlist_ID, Track_ID} = useParams();
    const [message, setMessage] = React.useState('');
    
    const handleDelete = async () => {
        try {
            const response = await fetch('http://samigacon.ide.3wa.io:3001/track-delete', {
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
                console.log('Deleting Track Done');
                setMessage('Deleting Track Done');
            } else {
                console.log('Deleting Track Error' + ' ' + response.status + ' ' + response.statusText);
                setMessage('Deleting Track Error');
            }
        } catch (error) {
            console.log('Deleting Query Error', error);
            setMessage('Deleting Query Error.');
        }
    }
    
    return (
        <>
            <h1>Remove Track from Playlist ?</h1>
            <div className="search-bar deleting-playlist">
                <button onClick={handleDelete}><Link to="/library">Yes</Link></button>
                <button><Link to="/library">No</Link></button>
            </div>
        </>
    )
}