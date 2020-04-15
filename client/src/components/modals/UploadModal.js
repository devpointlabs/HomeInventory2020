import React from 'react'
import { Modal, Button } from 'antd';
import FileUploader from '../uploaders/FileUploader'


class PopUp extends React.Component {
  state = {
    visible: true,
    confirmLoading: false,
    type: 'file'
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

  handleOk = () => {
    this.props.update()
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  };

  handleCancel = () => {
    console.log('Clicked cancel button');
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
          <FileUploader itemId={this.props.itemId}/>
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
          {/* <PhotoUploader/> */}
        </Modal>
      </div>
    )
  }
}

export default PopUp