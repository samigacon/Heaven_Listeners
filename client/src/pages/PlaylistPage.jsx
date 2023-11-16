import Loader from '../components/Loader'

import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

export default function PlaylistPage () {
    
    
    
    return (
        <>
            <h1>Playlist</h1>
            <button className="rename-playlist"><Link to="/playlist-rename">Rename Playlist</Link></button>
            <button className="delete-playlist"><Link to="/library">Delete Playlist</Link></button>
        </>
    )
}