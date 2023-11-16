import Loader from '../components/Loader'

import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

export default function LibraryPage () {
    
    
    
    return (
        <>
            <h1>Library</h1>
            <div className="library-playlists">
                <button className="add-playlist"><Link to="/playlist-add">Add Playlist</Link></button>
                <div className="library-list"><Link to="/playlist">Playlist 1</Link></div>
                <div className="library-list"><Link to="/playlist">Playlist 2</Link></div>
            </div>
            <div className="library-history">History</div>
            <div className="library-favorites">Favorites</div>
        </>
    )
}