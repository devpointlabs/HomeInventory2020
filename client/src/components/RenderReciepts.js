import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const RenderReciepts = (props) => {

    const [reciepts, setReciepts] = useState([])

    useEffect(() => {
        axios.get(`/api/items/${props.id}/receipts`).then(res => {
            setReciepts(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    const renderReciepts = () => {
        return reciepts.map(reciept => (
            <StyledImg src={reciept.img} width='auto' height='250px' />
        ))
    }

    return (
        <>
            {renderReciepts()}
        </>
    )
}

export default RenderReciepts;

const StyledImg = styled.img`
margin: 20px;
cursor: pointer;
transition: all 0.3s ease-in-out;

&:hover {
  box-shadow: 0 5px 10px black;
  transition: all 0.3s ease-in-out;
  }
`