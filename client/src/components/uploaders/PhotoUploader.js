import React from 'react';
import { Upload, message } from 'antd';
import { FileImageOutlined } from '@ant-design/icons';
import axios from 'axios'


const { Dragger } = Upload;
class PhotoUploader extends React.Component {
  
  state = {
    loadId: 0
  }


  onChange = (info) => {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file);
    }
    if (status === 'done') {
      const data = new FormData()
      data.append('file', info.file.originFileObj)
      // function passed here from parent
      this.props.upload(data)
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
 onRemove = () => {
    console.log('remove')
    console.log(this.state.loadId)
    axios.delete(`api/items/${this.props.itemId}/photos/${this.state.loadId}`)
  }

 render() {
  let data = {
    name: 'file',
    multiple: false,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  }
   return (
     <div style={draggerStyle}>
      <Dragger {...data} onChange={this.onChange} onRemove={this.onRemove}>
        <p className="ant-upload-drag-icon">
          <FileImageOutlined />
        </p>
        <p className="ant-upload-text">Click or drag photo to this area to upload</p>
      </Dragger>
    </div>
   )}
 }
 export default PhotoUploader;

const draggerStyle = {
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '20px',
  paddingBottom: '30px',
  paddingLeft: '10px',
  paddingRight: '10px',
}