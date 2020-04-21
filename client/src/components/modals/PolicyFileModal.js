import React from 'react'
import { Modal } from 'antd';
import FileUploader from '../uploaders/FileUploader'
import PolicyFileUploader from '../uploaders/PolicyFileUploader'
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
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.props.update()
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 1500);
  };

  handleCancel = async() => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible, confirmLoading } = this.state;

    return (
      <div>
        <Modal
          title={this.props.title}
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <PolicyFileUploader homeId={this.props.homeId} policyId={this.props.policyId} handleOk={this.handleOk}/>
        </Modal>
      </div>
    )
    }
}

export default UploadModal