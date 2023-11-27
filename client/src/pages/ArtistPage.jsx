import React from 'react'
import { useParams } from 'react-router-dom';
import { useArtistQuery  } from '../features/api/discogsApi';

export default function ArtistPage () {
    const { artistId } = useParams();
    
    const { data } = useArtistQuery();

    return (
        <>
            <h1>{data}</h1>
            {console.log('data : ' + data)}
        </>
    );
}
