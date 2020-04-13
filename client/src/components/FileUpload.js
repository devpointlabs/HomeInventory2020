import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import { List, Divider } from 'antd'

class FileUpload extends React.Component {
  state = {
    files: [],
    itemId: null
  }
  componentDidMount() {
    const { itemId, } = this.props
    if (itemId) {
      axios.get(`/api/items/${itemId}/documents`).then((res) => {
        console.log(res)
        this.setState({ files: res.data, itemId });
      }).catch((err) => {
        console.log(err)
      })
    }
  }
  componentDidUpdate() {
    const { itemId } = this.props
    if (itemId !== null && itemId !== this.state.itemId) {
      axios.get(`/api/items/${itemId}/documents`).then((res) => {
        console.log(res)
        this.setState({ photos: res.data, itemId });
      }).catch((err) => {
        console.log(err)
      })
    }
  }
  onDrop = (files) => {
    let data = new FormData()
    data.append('file', files[0])
    const itemId = this.props.itemId
    const fileName = files[0].name
    const path = files[0].path
    const fileDate = files[0].lastModifiedDate
    const file = { name: fileName, file: path, date: fileDate }
    console.log(file)
    axios.post(`/api/items/${itemId}/documents`, data).then((res) => {
      console.log(res)
      this.setState({ photos: [...this.state.files, res.data] });
    }).catch((err) => {
      console.log(err)
    })
  }
  renderFiles = () => {
    const { files } = this.state
    return files.map(file => (
      <>
      
      <List
        key={file.id}
        size="large"
        bordered
        >
        <List.Item>
            <a href={file.file} width='auto' height='200px'>{file.name}</a>
        </List.Item>
      </List>
      </>
    ))
  }
  render() {
    if (this.props.itemId) {
      return (
        <StyledCon>
          <Dropzone onDrop={this.onDrop} multiple={false}>
            {({ getRootProps, getInputProps }) => (
              <StyledDrop>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop file here, or click to select file</p>
                </div>
              </ StyledDrop>
            )}
          </Dropzone>
          <Divider orientation="left">Files</Divider>
          {this.renderFiles()}
        </StyledCon>
      )
    } else {
      return (
        <>
        </>
      )
    }
  }
}

export default FileUpload;

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
