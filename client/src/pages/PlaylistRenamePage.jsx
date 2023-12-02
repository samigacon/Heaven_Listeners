import React from 'react'

export default function PlaylistRenamePage () {
    const [newName, setNewName] = useState('');
    
    const handleRename = async () => {
        try {
            const response = await fetch('http://samigacon.ide.3wa.io:3001/playlists-rename', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    newName: newName
                }),
            });
            if (response.ok) {
                console.log('Renaming Done');
                setMessage('Renaming Done');
            } else {
                console.log('Renaming Error' + ' ' + response.status + ' ' + response.statusText);
                setMessage('Renaming Error');
            }
        } catch (error) {
            console.log('Renaming Query Error', error);
            setMessage('Renaming Query Error.');
        }
    }
    
    return (
        <>
            <h1>Rename Playlist</h1>
             <div className="search-bar renaming-playlist">
                <input type="text" placeholder="New Playlist Name" value={newName} onChange={(e) => setNewName(e.target.value)} />
                <button onClick={handleRename}><Link to="/library">Rename</Link></button>
            </div>
        </>
    )
}

  
