import React from 'react'
import { useParams } from 'react-router-dom';

export default function TrackPage () {
    const { Track_ID, Title } = useParams();
   
    return (
        <>
            <h1>Track - {Title}</h1>
            <img src="" alt={Title} />
            <button className="add-playlist"><Link to="/library">Add to Playlist</Link></button>
        </>
    )
}