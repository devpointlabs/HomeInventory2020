import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';

export default class ItemPhotos extends React.Component {
  state = {
    photos: []
  };

  componentDidMount() {
    const { itemId, } = this.props
    if (itemId) {
      axios.get(`/api/items/${itemId}/photos`).then((res) => {
        console.log(res)
        this.setState({ photos: res.data });
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  //seems to be doing something just not getting information passed in 
  onDrop = (files) => {
    let data = new FormData()
    data.append('file', files[0])
    const { itemId, } = this.props
    const photoName = files[0].name
    const path = files[0].path
    const photoDate = files[0].lastModifiedDate
    const photo = { name: photoName, file: path, date: photoDate }
    console.log(photo)
    axios.post(`/api/items/${itemId}/photos`, data).then((res) => {
      console.log(res)
      this.setState({ photos: [...this.state.photos, res.data] });
    }).catch((err) => {
      console.log(err)
    })
  }

  renderPhotos = () => {
    const { photos } = this.state
    return photos.map(photo => (
      <StyledImg key={photo.id}>
        <img src={photo.file} width='200px' height='200px' />
        {/* <p>{photo.name}</p> */}
      </StyledImg>
    ))
  }
  render() {
    if(this.props.itemId){
    return (
      <StyledCon>
        <Dropzone onDrop={this.onDrop} multiple={false}>
          {({ getRootProps, getInputProps }) => (
            <StyledDrop>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </ StyledDrop>
          )}
        </Dropzone>
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

const StyledDrop = styled.div`
border: 2.5px dashed black;
width: 200px;
height: 200px;
padding: 50px 10px;
background: #e3e3e3;
text-align: center;
margin: 10px 10px;
cursor: pointer;
`
const StyledImg = styled.div`
margin: 10px 10px;
border: 2px solid black;
cursor: pointer;
transition: all 0.3s ease-in-out;

&:hover {
  box-shadow: 0 5px 10px black;
  transition: all 0.3s ease-in-out;
  }
`

