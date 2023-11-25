import React from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { useSearchTracksQuery } from '../features/api/discogsApi';
    
export default function SearchPage () {
    const [searchQuery, setSearchQuery] = React.useState('');
    
    const { data, isLoading } = useSearchTracksQuery(searchQuery);
    
    const handleSearch = (e) => {
        event.preventDefault();
        console.log("Search done")
        setSearchQuery(searchQuery);
         console.log(searchQuery);
         console.log(data)
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
                </form>
            </div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {data ? (
                        <div>
                            {data.results.map((item) => (
                                <div key={item.id}>{item.title}</div>
                            ))}
                        </div>
                    ) : (
                        <p>No results found.</p>
                    )}
                </div>
            )}
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