import React from 'react'
import { useParams } from 'react-router-dom';

export default function AlbumPage () {
    const { Album_ID, Title } = useParams();
    
    return (
        <>
            <h1>Release - {Title}</h1>
            <img src="" alt={Title} />
        </>
    )
}