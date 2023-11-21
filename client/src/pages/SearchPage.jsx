import React from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { useSearchTracksQuery } from '../features/api/discogsApi';
    
export default function SearchPage () {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [searchResults, setSearchResults] = React.useState([]);
    
    const { data, error, isLoading } = useSearchTracksQuery(searchQuery);
    
    const handleSearch = async (e) => {
        e.preventDefault();
        try {
              if (data && data.results) {
                setSearchResults(data.results);
              }
            } catch (error) {
              console.error('Error:', error);
         }
    }

    return (
        <>
            <h1>Search</h1>
            <div className="search-bar">
                <form onSubmit={handleSearch}>
                    <label htmlFor="searching"></label>
                        <input
                            type="text"
                            name="searching"
                            placeholder="Searching by artist, track or album..."
                            required
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            />
                    <button type="submit">Search</button>
                </form>
            </div>
            { console.log('searchQuery : ' + searchQuery) }
            { console.log('searchResults : ' + searchResults) }
            <h2 className ="search-tag">Artists</h2>
            <div className="search-artist">
                <div className="artists"><Link to="/artist">Artist 1</Link></div>
            </div>
            <h2 className ="search-tag">Tracks</h2>
            <div className="search-track">
                <div className="tracks"><Link to="/track">Track 1</Link></div>
            </div>
            <h2 className ="search-tag">Albums</h2>
            <div className="search-album">
                <div className="albums"><Link to="/album">Album 1</Link></div>
            </div>
        </>
    )
}