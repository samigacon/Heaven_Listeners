import Loader from '../components/Loader'

import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

export default function HomePage () {
    
    
    
    return (
        <div className="homepage">
            <h1>Home</h1>
            <a><h2 className="button-history"><Link to="/history">History</Link></h2></a>
            <div className="home-history"></div>
            <a><h2 className="button-favorites"><Link to="/favorites">Favorites</Link></h2></a>
            <div className="home-favorites"></div>
            <a><h2 className="button-playlists"><Link to="/playlist">Playlists</Link></h2></a>
            <div className="home-playlists"></div>
        </div>
    )
}