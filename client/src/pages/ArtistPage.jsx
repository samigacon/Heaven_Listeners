import React from 'react'
import { useParams } from 'react-router-dom';
import { useSearchQuery } from '../features/api/discogsApi';

export default function ArtistPage () {
    const { artistId } = useParams();

    return (
        <>
            <h1>{artistId}</h1>
            {console.log('artistId : ' + artistId)}
        </>
    );
}
