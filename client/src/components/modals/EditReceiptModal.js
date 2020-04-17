import React from 'react'
import axios from "axios";
import { Form, Input, DatePicker, InputNumber, Modal } from "antd";

class EditReceiptModal extends React.Component {

  state = {
    visible: true,
    confirmLoading: false,
    itemId: null,
    receipt: {
      id: null,
      date: null, 
      receipt_num: "", 
      purchased_from: "", 
      price: "", 
      tax: "", 
      img: "" 
    }
  } 
  

  componentDidMount() {
    const { itemId, receiptId } = this.props

    axios.get(`/api/items/${itemId}/receipts/${receiptId}`)
    .then(res => {
      console.log(res)
      this.setState({receipt: res.data});
    })
  }
  

  handlePriceChange = (value) => {
    this.setState({receipt: {...this.state.receipt, price: value}})
  };

  handleTaxChange = (value) => {
    this.setState({receipt: {...this.state.receipt, tax: value}})
  };

  handleChange = (e) => {
    const { name, value, } = e.target;
    this.setState({receipt: {...this.state.receipt, [name]: value }});
  };

  handleDate = (date) => {
    this.setState({receipt: {...this.state.receipt, date: date}})
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk =() => { 
    const { itemId } = this.props
    const { id } = this.state.receipt

    axios.patch(`/api/items/${itemId}/receipts/${id}`, { ...this.state.receipt })
    .then( res => {
      console.log(res)
    })
   this.setState({
    confirmLoading: true,
   });
    setTimeout(() => {
       // The function below is passed from Item.js to hot-reload and change tab on item page.
      this.props.tab()
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 1000);
  };

  handleCancel = async() => {
    console.log('Clicked cancel button');
    this.props.tab()
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible, confirmLoading, itemId } = this.state;
    const { date, receipt_num, purchased_from, price, tax, img} = this.state.receipt;

    return (
      <div>
        <Modal
          title='Edit Receipt'
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          {/* _________________________FORM_________________________ */}
          <> 
            <Form onFinish={this.handleSubmit}>
              <Form.Item >
                <Input
                label="Purchase Date"
                placeholder="Purchase Date"
                autoFocus
                required
                name='date'
                value={date}
                onChange={this.handleChange}
                />
              </Form.Item>
              <Form.Item>
                <Input
                label="Receipt Number"
                required
                name='receipt_num'
                value={receipt_num}
                placeholder='Receipt Number'
                onChange={this.handleChange}
                />
              </Form.Item>
              <Form.Item>
                <Input
                label="Purchased From"
                required
                name='purchased_from'
                value={purchased_from}
                placeholder='Purchased From'
                onChange={this.handleChange}
                />
              </Form.Item>
              <Form.Item>
                <InputNumber
                  label="Price"
                  required
                  name='price'
                  value={price}
                  defaultValue={0}
                  placeholder='price'
                  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  onChange={this.handlePriceChange}
                />
              </Form.Item>
              <Form.Item>
                <InputNumber
                  label="Tax"
                  required
                  name='tax'
                  value={tax}
                  defaultValue={0}
                  placeholder='tax'
                  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  onChange={this.handleTaxChange}
                />
              </Form.Item>
              <Form.Item>
                <Input
                label="Image"
                required
                name='img'
                value={img}
                placeholder='Image'
                onChange={this.handleChange}
                />
              </Form.Item>
            </Form>
          </>        
        </Modal>
      </div>
    );
  }
}

export default EditReceiptModal


