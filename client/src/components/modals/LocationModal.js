import React from 'react'
import { Modal } from 'antd';
import LocationForm from '../forms/LocationForm'

class ItemModal extends React.Component {
  state = {
    visible: true,
    confirmLoading: false,
  }
 

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk =() => { 
    this.refs.newLocation.handleSubmit()
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
      this.props.tab('blank')
    }, 1000);
  };

  handleCancel = async() => {
    console.log('Clicked cancel button');
    this.props.tab('blank')
    this.setState({
      visible: false,
    });
  };


  render(){
    const { visible, confirmLoading } = this.state;

    return(
      <Modal
        title='Enter New Location'
        visible={visible}
        onOk={this.handleOk}
        confirmLoading={confirmLoading}
        onCancel={this.handleCancel}
      >
        <LocationForm ref='newLocation' update={this.props.update}/>
      </Modal>
    )
  }
}
export default ItemModal