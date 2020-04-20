import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RenderReciepts from './RenderReciepts';

const RecieptGallery = () => {

    const [reciepts, setReciepts] = useState([])

    useEffect(() => {
        axios.get(`/api/items`).then(res => {
            setReciepts(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    const renderReciepts = () => {
        return reciepts.map(reciept => (
                <RenderReciepts id={reciept.id} />
        ))
    }

    return (
        <>
            {renderReciepts()}
        </>
    )
}

export default RecieptGallery;
