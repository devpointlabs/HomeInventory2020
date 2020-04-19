import React from 'react'
import { Modal } from 'antd';
import MaintenanceForm from '../forms/MaintenanceForm'

class MaintenanceModal extends React.Component {
  state = {
    visible: false,
    confirmLoading: false,
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk =() => { 
    this.refs.newMaint.handleSubmit()
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

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };


  render(){
    const { visible, confirmLoading } = this.state;

    return(
      <Modal
        title='Add Maintenance Item'
        visible={visible}
        onOk={this.handleOk}
        confirmLoading={confirmLoading}
        onCancel={this.handleCancel}
      >
        <MaintenanceForm ref='newMaint' />
      </Modal>
    )
  }
}
export default MaintenanceModal