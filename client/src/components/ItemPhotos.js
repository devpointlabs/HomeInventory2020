import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';

export default class ItemPhotos extends React.Component {
  state = {
    photos: [],
    itemId: null,
    photoId: null
  };

  componentDidMount() {
    const { itemId, } = this.props
    if (itemId) {
      axios.get(`/api/items/${itemId}/photos`).then((res) => {
        console.log(res)
        this.setState({ photos: res.data, itemId });
      }).catch((err) => {
        console.log(err)
      })
    }
  }
  componentDidUpdate() {
    const { itemId } = this.props
    if( itemId !== null && itemId !== this.state.itemId ) {
    axios.get(`/api/items/${itemId}/photos`).then((res) => {
      console.log(res)
      this.setState({photos: res.data, itemId});
    }).catch((err) => {
      console.log(err)
    })
   }
  }

  setPhotoId = (id) => {
    this.setState({
      photoId: id
    });
  }

  deletePhoto = () => {
    const { photoId, photos } = this.state
    const { itemId } = this.props
    
    axios.delete(`/api/items/${itemId}/photos/${photoId}`).then(res => {
      console.log(res)
      const filteredPhotos = photos.filter(photo => photo.id !== photoId)
      this.setState({
        photos: filteredPhotos
      });
    })
  }

  renderPhotos = () => {
    const { photos, photoId } = this.state
    return photos.map(photo => (
      <StyledImg key={photo.id}>
        <img src={photo.file} 
        width='auto' 
        height='200px' 
        style={photoId === photo.id ? activeImg : {}}
        onClick={() => this.setPhotoId(photo.id)}
        />
      </StyledImg>
    ))
  }
  render() {
    if(this.props.itemId){
    return (
      <StyledCon>
        {this.renderPhotos()}
      </StyledCon>
    )} else {
      return(
        <>
        </>
      )
    }
  }
}

const StyledCon = styled.div`
display: flex;
flex-wrap: wrap;
flex-direction: row;
align-content: space-around;
margin-left: 2%; 
margin-right: 2%;
`

const StyledImg = styled.div`
margin: 10px 10px;
cursor: pointer;
transition: all 0.3s ease-in-out;

&:hover {
  box-shadow: 0 5px 10px black;
  transition: all 0.3s ease-in-out;
  }
`
const activeImg = {
  boxShadow: '0 5px 10px black',
  transition: 'all 0.3s ease-in-out',
  transform: 'scale(1.06)'
}

