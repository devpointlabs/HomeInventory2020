import React from 'react'
import { Modal } from 'antd';
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
   this.setState({
    confirmLoading: true,
   });
    this.refs.newReceipt.handleSubmit()
    setTimeout(() => {
       // The function below is passed from Item.js to hot-reload and change tab on item page.
      this.props.update()
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  };

  handleCancel = async() => {
    console.log('Clicked cancel button');
    this.props.update()
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible, confirmLoading, itemId } = this.state;
  
    return (
      <div>
        <Modal
          title='Enter Item Receipt'
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