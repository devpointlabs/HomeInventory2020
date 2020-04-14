import React from 'react';
import axios from 'axios';
import { List } from 'antd';

class FileUpload extends React.Component {
  state = {
    files: [],
    itemId: null,
    fileId: null
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
  setId = (id) => {
    console.log(id)
    this.setState({
      fileId: id
    });
  }
  // itemId !== null ? activeTab : {}}
  renderFiles = () => {
    const { files, fileId } = this.state
    return files.map(file => (
      <div style={fileId === file.id ? activeFileDiv : passiveFileDiv} key={file.id} onClick={() => this.setId(file.id)}>
      <List
        size="large"
        bordered
        >
        <List.Item>
          <a href={file.file} width='auto' height='200px'>{file.name} </a>
        </List.Item>
      </List>
      </div>
    ))
  }
  render() {
    if (this.props.itemId) {
      return (
        <div style={{padding: '20px'}}>
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

const passiveFileDiv = {
  margin: '12px',
  cursor: 'pointer'
}
const activeFileDiv = {
  margin: '12px',
  cursor: 'pointer',
  backgroundColor: 'lightgrey'
}