import Loader from '../components/Loader'

import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

export default function PlaylistAddPage () {
    
    
    
    return (
        <>
            <h1>Add Playlist</h1>
            <div className="search-bar creating-playlist">
                <input type="text" placeholder="Put the name"/>
                <button><Link to="/library">Add</Link></button>
            </div>
        </>
    )
}