import React from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import axios from 'axios'


const { Dragger } = Upload;
class Uploader extends React.Component {
  
  onChange = (info) => {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file);
    }
    if (status === 'done') {
      const data = new FormData()
      data.append('file', info.file.originFileObj)
      axios.post(`/api/items/${this.props.itemId}/documents`, data).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      });
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

 render() {
  let data = {
    name: 'file',
    multiple: false,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  }
   return (
     <div style={draggerStyle}>
      <Dragger {...data} onChange={this.onChange}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
      </Dragger>
    </div>
   )}
 }
 export default Uploader;

const draggerStyle = {
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '20px'
}