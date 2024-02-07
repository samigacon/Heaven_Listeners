import React from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function PlaylistDeletePage () {
    const {Playlist_ID, Name} = useParams();
    const [message, setMessage] = React.useState('');
    
    const handleDelete = async () => {
        try {
            const response = await fetch('http://samigacon.ide.3wa.io:3001/playlists-delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    playlistId: Playlist_ID,
                    name: Name,
                }),
            });
            if (response.ok) {
                // console.log('Deleting Done');
                setMessage('Deleting Done');
            } else {
                // console.log('Deleting Error' + ' ' + response.status + ' ' + response.statusText);
                setMessage('Deleting Error');
            }
        } catch (error) {
            // console.error('Deleting Query Error', error);
            setMessage('Deleting Query Error.');
        }
    }
    
    return (
        <>
            <h1>Delete Playlist ?</h1>
            <div className="search-bar deleting-playlist">
                <button onClick={handleDelete}><Link to="/library">Yes</Link></button>
                <button><Link to="/library">No</Link></button>
            </div>
        </>
    )
}