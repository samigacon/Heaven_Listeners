import './App.css'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Error404 from '../components/Error404'

import HomePage from '../pages/HomePage'
import SearchPage from '../pages/SearchPage'
import LibraryPage from '../pages/LibraryPage'
import LoginPage from '../pages/LoginPage'
import LogoutPage from '../pages/LogoutPage'
import RegisterPage from '../pages/RegisterPage'
import TrackPage from '../pages/TrackPage'
import AlbumPage from '../pages/AlbumPage'
import ArtistPage from '../pages/ArtistPage'
import FavoritesPage from '../pages/FavoritesPage'
import HistoricPage from '../pages/HistoricPage'
import PlaylistPage from '../pages/PlaylistPage'
import PlaylistNewPage from '../pages/PlaylistNewPage'
import PlaylistAddPage from '../pages/PlaylistAddPage'
import PlaylistChangePage from '../pages/PlaylistChangePage'
import PlaylistDeletePage from '../pages/PlaylistDeletePage'

import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

function App() {
    return (
        <div>
            <Router>
                <Header />
                <h2>Welcome to Heaven Listeners ! Below is the Header component, the Routes, and the Footer</h2>
                <Routes>
                    <Route path="/" element={ <HomePage /> } />
                    <Route path="/search" element={ <SearchPage /> } />
                    <Route path="/library" element={ <LibraryPage /> } />
                    <Route path="/login" element={ <LoginPage /> } />
                    <Route path="/logout" element={ <LogoutPage /> } />
                    <Route path="/register" element={ <RegisterPage /> } />
                    <Route path="/track" element={ <TrackPage /> } />
                    <Route path="/album" element={ <AlbumPage /> } />
                    <Route path="/artist" element={ <ArtistPage /> } />
                    <Route path="/favorites" element={ <FavoritesPage /> } />
                    <Route path="/historic" element={ <HistoricPage /> } />
                    <Route path="/playlist" element={ <PlaylistPage /> } />
                    <Route path="/playlist-new" element={ <PlaylistNewPage /> } />
                    <Route path="/playlist-add" element={ <PlaylistAddPage /> } />
                    <Route path="/playlist-change" element={ <PlaylistChangePage /> } />
                    <Route path="/playlist-delete" element={ <PlaylistDeletePage /> } />
                    <Route path="*" element={ <Error404 /> } />
                </Routes>
                <Footer />
            </Router>
        </div>
    )
}

export default App