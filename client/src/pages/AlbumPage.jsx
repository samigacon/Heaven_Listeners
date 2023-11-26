import React from 'react'
import { useParams } from 'react-router-dom';

export default function AlbumPage () {
    const { releaseId } = useParams();
    
    
    return (
        <>
            <h1>{releaseId}</h1>
            {console.log('releaseId : ' + releaseId)}
        </>
    )
}