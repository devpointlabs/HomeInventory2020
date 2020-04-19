import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const RenderPhotos = (props) => {

    const [photos, setPhotos] = useState([])

    useEffect(() => {
        axios.get(`/api/items/${props.id}/photos`).then(res => {
            setPhotos(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    const renderPhotos = () => {
        return photos.map(photo => (
                <StyledImg src={photo.file} width='auto' height='175px'/>
        ))
    }

    return (
        <>
        {renderPhotos()}
        </>
    )
}

export default RenderPhotos;

const StyledImg = styled.img`
margin: 20px;
cursor: pointer;
transition: all 0.3s ease-in-out;

&:hover {
  box-shadow: 0 5px 10px black;
  transition: all 0.3s ease-in-out;
  }
`
