import React from 'react'
import { Modal } from 'antd';
import ItemForm from '../forms/ItemForm'

class ItemModal extends React.Component {
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
    // this.props.update()
    this.refs.newItem.handleSubmit()
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


  render(){
    const { visible, confirmLoading, itemId } = this.state;

    return(
      <Modal
        title='Create New Item'
        visible={visible}
        onOk={this.handleOk}
        confirmLoading={confirmLoading}
        onCancel={this.handleCancel}
      >
        <ItemForm ref='newItem' itemId={itemId} update={this.props.update} locationId={this.props.locationId}/>
      </Modal>
    )
  }
}
export default ItemModal