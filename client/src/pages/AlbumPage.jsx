import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetTracklistQuery } from '../features/api/ReleasesDiscogsApi'; 

export default function AlbumPage () {
    const { Album_ID, Title } = useParams();
    const { data: tracklist, isLoading, isError } = useGetTracklistQuery(Album_ID);

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
                    </div>
                ))}
            </div>
            
        </>
    );
}


