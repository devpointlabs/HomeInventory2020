import React from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';



const { Dragger } = Upload;
class Uploader extends React.Component {
  
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
      this.props.upload(data)
      message.success(`${info.file.name} file uploaded successfully.`);
      this.props.handleOk()
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
 onRemove = () => {
    console.log('remove')
    console.log(this.state.loadId)

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
  paddingTop: '20px',
  paddingBottom: '30px',
  paddingLeft: '10px',
  paddingRight: '10px',
}