import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { List, Divider, Button } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import Uploader from './Uploader';
class FileUpload extends React.Component {
  state = {
    files: [],
    itemId: null,
    showLoader: false
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
  toggleNew= () => {
  this.setState({showLoader: !this.state.showLoader});
  }

  deleteItem = (id) => {
    const { files } = this.state
    axios.delete(`api/items/${this.props.itemId}/documents/${id}`)
    .then(res => {
      console.log(res)
      const filteredArr = files.filter( f => f.id !== id )
      this.setState({
        files: filteredArr
      });
    }).catch(err => {
      console.log(err)
    })
  }

  renderFiles = () => {
    const { files } = this.state
    return files.map(file => (
      <div style={{margin: '12px'}}>
      <List
        key={file.id}
        size="large"
        bordered
        >
        <List.Item>
            <a href={file.file} width='auto' height='200px'>{file.name}</a>
            <Button  shape="circle" onClick={() => this.deleteItem(file.id)}>
                <DeleteOutlined />
            </Button>
        </List.Item>
      </List>
      </div>
    ))
  }
  render() {
    const { showLoader } = this.state
    if (this.props.itemId) {
      return (
        <div style={{padding: '20px'}}>
          <Button type="primary" shape="circle" onClick={() => this.toggleNew()}>
                <PlusOutlined />
          </Button>
          {showLoader ? 
          <Uploader itemId={this.state.itemId}/>
          : null}
          
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
