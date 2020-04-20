import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RenderPhotos from './RenderPhotos';

const PhotoGallery = () => {

    const [photos, setPhotos] = useState([])

    useEffect(() => {
        axios.get(`/api/items`).then(res => {
            setPhotos(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    const renderPhotos = () => {
        return photos.map(photo => (
                <RenderPhotos id={photo.id}/>
        ))
    }

    return (
        <>
        {renderPhotos()}
        </>
    )
}

export default PhotoGallery;
