import React from 'react'
import { Modal } from 'antd';
import FileUploader from '../uploaders/FileUploader'
import PhotoUploader from '../uploaders/PhotoUploader'
import axios from 'axios'

class UploadModal extends React.Component {
// Class takes props for title, which appears at top, 
// itemId, which is passed to child dragger component for axios call,
// type - either 'file' or 'photo' - will render the correct component for dragger
// and an update function from Items.js for hot-reloading on submit. 

  state = {
    visible: true,
    confirmLoading: false,
    type: 'file',
    fileId: null,
    photoId: null
  };
  // Must pass a type in to this component - either 'file' or 'photo' and result will change version that is rendered.
  componentDidMount() {
    this.setState({
      type: this.props.type
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  postFile = (data) => {
      axios.post(`/api/items/${this.props.itemId}/documents`, data)
      .then((res) => {
        console.log(res)
        this.setState({
          fileId: res.data.id
        })
      }).catch((err) => {
        console.log(err)
      });
  }

  postPhoto = (data) => {
    axios.post(`/api/items/${this.props.itemId}/photos`, data)
    .then((res) => {
      console.log(res)
      this.setState({
        photoId: res.data.id
      })
    }).catch((err) => {
      console.log(err)
    });
  }

  handleOk =() => {
    const { type } = this.state  
    //The function below is passed from Item.js to hot-reload and change tab on itm page.
    this.props.update()
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 1500);
  };

  handleCancel = async() => {
    const { type } = this.state
    console.log('Clicked cancel button');
    if (type === 'file'){
      axios.delete(`api/items/${this.props.itemId}/documents/${this.state.fileId}`).then(res => {console.log(res)})
    } else if (type === 'photo') {
      axios.delete(`api/items/${this.props.itemId}/photos/${this.state.photoId}`).then(res => {console.log(res)})
    }
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible, confirmLoading, type } = this.state;
    if (type === 'file'){
    return (
      <div>
        <Modal
          title={this.props.title}
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <FileUploader itemId={this.props.itemId} upload={this.postFile}/>
        </Modal>
      </div>
    );
  } else if (type === 'photo')
    return (
      <div>
        <Modal
          title={this.props.title}
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <PhotoUploader itemId={this.props.itemId} upload={this.postPhoto}/>
        </Modal>
      </div>
    )
  }
}

export default UploadModal