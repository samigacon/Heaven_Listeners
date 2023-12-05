import React from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { useSearchQuery } from '../features/api/SearchDiscogsApi';
    
export default function SearchPage () {
    const [searchQuery, setSearchQuery] = React.useState('');
    
    const { data, isLoading } = useSearchQuery(searchQuery);

    const handleSearch = (e) => {
        event.preventDefault();
        setSearchQuery(searchQuery);
    }
    
    // Filter results by type (artist, track, album)
    const filterResultsByType = (results, type) => {
        return results.filter((element) => element.type === type);
    };
    
    const artists = data ? filterResultsByType(data.results, 'artist') : [];
    const releases = data ? filterResultsByType(data.results, 'release') : [];
    
    return (
        <>
            <h1>Search</h1>
            <div className="search-bar">
                <form onSubmit={handleSearch}>
                    <label htmlFor="searching"></label>
                        <input
                            type="text"
                            name="searching"
                            placeholder="Searching by artist or album..."
                            required
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                </form>
            </div>
            {isLoading ? (
                <h3>Loading...</h3>
            ) : (
                <div>
                    <div>
                        <h2 className="search-tag">Artists</h2>
                        <div className="search-artist">
                            {artists.length === 0 ? (
                                <p>No artist found.</p>
                            ) : (
                                artists.map((artist) => (
                                    <div className='tags' key={artist.id}>
                                        {artist.title.replace(/\([^)]*\)/g, '').trim()}
                                        <Link to={`/artist/${artist.id}/${artist.title}`}><img src={artist.cover_image} alt={artist.title} /></Link>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                    <div>
                        <h2 className="search-tag">Albums</h2>
                        <div className="search-album">
                            {releases.length === 0 ? (
                                <h3>No album found.</h3>
                            ) : (
                                releases.map((release) => (
                                    <div className='tags' key={release.id}>
                                        {release.title}
                                        <Link to={`/album/${release.id}/${release.title}`}><img src={release.cover_image} alt={release.title} /></Link>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}