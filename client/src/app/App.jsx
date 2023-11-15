import { useState } from 'react'
import './App.css'

function App() {
    return (
        <>
        <Router>
            <Header />
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
                <Route path="/playlist-change" element={ <PlayListChangePage /> } />
                <Route path="/playlist-delete" element={ <PlaylistDeletePage /> } />
                <Route path="*" element={ <Error404 /> } />
            </Routes>
            <Footer />
        </Router>
        </>
    )
}

export default App
