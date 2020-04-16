import React from 'react'
import { Modal, Button } from 'antd';
import ReceiptForm from '../forms/ReceiptForm';

class ReceiptModal extends React.Component {

  state = {
    visible: true,
    confirmLoading: false,
    itemId: null
  }

  componentDidMount() {
    this.setState({
      itemId: this.props.itemId
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk =() => { 
    // //The function below is passed from Item.js to hot-reload and change tab on itm page.
    this.props.update()
    this.refs.newReceipt.handleSubmit()
    this.setState({
      confirmLoading: true,
    });
  };

  handleCancel = async() => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible, confirmLoading, itemId } = this.state;
  
    return (
      <div>
        <Modal
          title={this.props.title}
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <ReceiptForm ref='newReceipt' itemId={itemId}/>
        </Modal>
      </div>
    );
  }
}

export default ReceiptModal