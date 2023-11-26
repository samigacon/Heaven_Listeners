import React from 'react'
import { useParams } from 'react-router-dom';

export default function TrackPage () {
    const { trackId } = useParams();
   
    
    return (
        <>
            <h1>{trackId}</h1>
            {console.log('trackId : ' + track.Id)}
        </>
    )
}