import './App.css'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Error404 from '../components/Error404'

import HomePage from '../pages/HomePage'
import SearchPage from '../pages/SearchPage'
import LibraryPage from '../pages/LibraryPage'
import LoginPage from '../pages/LoginPage'
import AlbumPage from '../pages/AlbumPage'
import ArtistPage from '../pages/ArtistPage'
import PlaylistPage from '../pages/PlaylistPage'
import PlaylistNewPage from '../pages/PlaylistNewPage'
import PlaylistRenamePage from '../pages/PlaylistRenamePage'
import PlaylistDeletePage from '../pages/PlaylistDeletePage'
import TrackAddPage from '../pages/TrackAddPage'
import RemoveTrackFromPlaylistPage from '../pages/RemoveTrackFromPlaylistPage'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function App() {
    return (
        <div className="container">
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={ <HomePage /> } />
                    <Route path="/search" element={ <SearchPage /> } />
                    <Route path="/library" element={ <LibraryPage /> } />
                    <Route path="/login" element={ <LoginPage /> } />
                    <Route path="/album/:Album_ID/:Title" element={ <AlbumPage /> } />
                    <Route path="/artist/:Artist_ID/:Name" element={ <ArtistPage /> } />
                    <Route path="/playlist/:Playlist_ID/:Name" element={ <PlaylistPage /> } />
                    <Route path="/playlist-new" element={ <PlaylistNewPage /> } />
                    <Route path="/playlist-rename/:Playlist_ID/:Name" element={ <PlaylistRenamePage /> } />
                    <Route path="/playlist-delete/:Playlist_ID/:Name" element={ <PlaylistDeletePage />} />
                    <Route path="/track-add/:Album_ID/:Track_Title" element={ <TrackAddPage /> } />
                    <Route path="/track-delete" element={ <RemoveTrackFromPlaylistPage />} />
                    <Route path="*" element={ <Error404 /> } />
                </Routes>
                <Footer />
            </Router>
        </div>
    )
}