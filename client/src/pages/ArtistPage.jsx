import React from 'react'
import { useParams } from 'react-router-dom';

export default function ArtistPage () {
    const { Artist_ID, Name } = useParams();

    return (
        <>
            <h1>Artist - {Name}</h1>
            <img src="" alt={Name} />
        </>
    );
}
