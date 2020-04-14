import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { List, Divider } from 'antd';
import Uploader from './Uploader';
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
  onDrop = () => {
   
  }

  renderFiles = () => {
    const { files } = this.state
    return files.map(file => (
      <div style={{margin: '18px'}}>
      <List
        key={file.id}
        size="large"
        bordered
        >
        <List.Item>
            <a href={file.file} width='auto' height='200px'>{file.name}</a>
        </List.Item>
      </List>
      </div>
    ))
  }
  render() {
    if (this.props.itemId) {
      return (
        <div>
          <Uploader itemId={this.state.itemId}/>
          <Divider orientation="left"></Divider>
          {this.renderFiles()}
        </div>
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