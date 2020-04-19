import React, { useState } from 'react';
import styled from 'styled-components';
import PhotoGallery from './PhotoGallery';
import RecieptGallery from './RecieptGallery';

const Album = () => {

  const [photoTab, setPhotoTab] = useState(true)
  const [recieptTab, setRecieptTab] = useState(false)

  const switchTab = () => {
    setPhotoTab(!photoTab)
    setRecieptTab(!recieptTab)
  }

  const renderGallery = () => {
    if (photoTab === true) {
      return (
        <GalleryCon>
          <PhotoGallery/>
        </GalleryCon>
      )
    } else {
      return (
        <GalleryCon>
          <RecieptGallery/>
        </GalleryCon>
      )
    }
  }
  return (
    <>
      <StyledBar>
        <StyledP>Show: </StyledP>
        <StyledCon>
          <StyledSpan onClick={switchTab}>Photos</StyledSpan>
          <StyledLine style={photoTab === true ? activeTab : passiveTab} />
        </StyledCon>
        <StyledCon>
          <StyledSpan onClick={switchTab}>Reciepts</StyledSpan>
          <StyledLine style={recieptTab === true ? activeTab : passiveTab} />
        </StyledCon>
      </StyledBar>
      {renderGallery()}
    </>
  )
}

const activeTab = { display: 'block', transition: '0.2s all ease-in-out' }
const passiveTab = { display: 'none', transition: '0.2s all ease-in-out' }

const StyledBar = styled.div`
width: 100%;
height: 40px;
background: #E0E0E0;
display: flex; 
align-items: center;
`
const StyledCon = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`
const GalleryCon = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
margin: 25px 50px;
`
const StyledSpan = styled.span`
font-size: 15px;
margin-left: 15px;
cursor: pointer;
color: black;
transition: 0.2s all ease-in-out;

&:hover {
  color: #1890ff;
  transition: 0.2s all ease-in-out;
}
`
const StyledLine = styled.div`
width: 50px;
height: 2px;
border-radius: 25px;
background: black;
margin-left: 15px;
opacity: 0.7;
`
const StyledP = styled.span`
font-size: 15px;
margin-left: 15px;
color: black;
`

export default Album;