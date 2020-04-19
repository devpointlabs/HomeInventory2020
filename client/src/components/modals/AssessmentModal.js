import React from 'react'
import { Modal } from 'antd';
import AssessmentForm from '../forms/AssessmentForm'

class AssessmentModal extends React.Component {
  state = {
    visible: false,
    confirmLoading: false,
    itemId: null
  }


  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk =() => { 
    this.refs.newAsmt.handleSubmit()
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.props.update()
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 1000);
  };

  handleCancel = async() => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };


  render(){
    const { visible, confirmLoading } = this.state;

    return(
      <Modal
        title='Add Assessment History'
        visible={visible}
        onOk={this.handleOk}
        confirmLoading={confirmLoading}
        onCancel={this.handleCancel}
      >
        <AssessmentForm ref='newAsmt' />
      </Modal>
    )
  }
}
export default AssessmentModal