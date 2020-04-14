import React from 'react';
import axios from 'axios';
import { List } from 'antd';

class FileUpload extends React.Component {
  state = {
    files: [],
    itemId: null,
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

  renderFiles = () => {
    const { files } = this.state
    return files.map(file => (
      <div style={{margin: '12px'}} key={file.id}>
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
