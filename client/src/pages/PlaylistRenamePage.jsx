import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function PlaylistRenamePage () {
    const {Playlist_ID, Name} = useParams();
    const [newName, setNewName] = React.useState('');
    const [message, setMessage] = React.useState('');
    
    const handleRename = async () => {
        try {
            const response = await fetch('http://192.168.0.20:3001/playlists-rename', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    playlistId: Playlist_ID,
                    newName: newName,
                }),
            });
            if (response.ok) {
                // console.log('Renaming Done');
                setMessage('Renaming Done');
            } else {
                // console.log('Renaming Error' + ' ' + response.status + ' ' + response.statusText);
                setMessage('Renaming Error');
            }
        } catch (error) {
            // console.error('Renaming Query Error', error);
            setMessage('Renaming Query Error.');
        }
    }
    
    return (
        <>
            <h1>Rename Playlist</h1>
            <div className="search-bar renaming-playlist">
                <label htmlFor="rename">Rename</label>
                    <input 
                    type="text"
                    name="rename"
                    placeholder="New Playlist Name" 
                    value={newName} 
                    required
                    onChange={(e) => setNewName(e.target.value)} 
                    />
                <button onClick={handleRename}><Link to="/library">Rename</Link></button>
            </div>
        </>
    )
}

  
