import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useGetTracklistQuery } from '../features/api/ReleasesDiscogsApi'; 

export default function AlbumPage () {
    const { Album_ID, Title } = useParams();
    const { data: tracklist, isLoading, isError } = useGetTracklistQuery(Album_ID);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    
    React.useEffect(() => {
        // Keep Session if Connected
        const localUserConnected = localStorage.getItem('userConnected');
        if (localUserConnected === 'true') {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    if (isLoading) return <h2>Loading...</h2>;
    if (isError) return <h2>Error loading the tracklist.</h2>;

    return (
        <>
            <h1>Release : {Title}</h1>
            <div>
                {/* If Tracklist exists*/}
                {tracklist?.tracklist.map((track, index) => ( 
                    <div key={index}>
                        <h2>{track.position} : {track.title} - {track.duration}</h2>
                        {isLoggedIn && (
                            <button className="add-track"><Link to={`/track-add/${Album_ID}/${track.title}`}>Add to a Playlist</Link></button>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}


