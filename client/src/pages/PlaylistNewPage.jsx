import React from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

export default function PlaylistNewPage () {
    const [message, setMessage] = React.useState('');
    const [name, setName] = React.useState('');
    
    const handleAdd = async () => {
        try {
            const response = await fetch('http://192.168.0.20:3001/playlists-new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name
                }),
            });
            if (response.ok) {
                // console.log('New Playlist Done');
                setMessage('Adding Playlist Done');
            } else {
                // console.log('Adding Playlist Error' + ' ' + response.status + ' ' + response.statusText);
                setMessage('Adding Playlist Error');
            }
        } catch (error) {
            // console.error('Adding Playlist Query Error', error);
            setMessage('Adding Playlist Query Error.');
        }
    }
    
    return (
        <>
            <h1>New Playlist</h1>
            <div className="search-bar creating-playlist">
                <input type="text" 
                placeholder="Put the name"
                required
                onChange={(e) => setName(e.target.value)}/>
                <button onClick={handleAdd}><Link to="/library">New</Link></button>
            </div>
        </>
    )
}