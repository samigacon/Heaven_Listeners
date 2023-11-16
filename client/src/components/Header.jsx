import HomePage from '../pages/HomePage'
import SearchPage from '../pages/SearchPage'
import LibraryPage from '../pages/LibraryPage'
import LoginPage from '../pages/LoginPage'

import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

export default function Header() {
    return (
        <header>
            <div className="summary">
                <ul>
                    <a><li><Link to="/">Home</Link></li></a>
                    <a><li><Link to="/search">Search</Link></li></a>
                    <a><li><Link to="/library">Library</Link></li></a>
                    <a><li><Link to="/login">Profile</Link></li></a>
                </ul>
            </div>
        </header>
    )
}