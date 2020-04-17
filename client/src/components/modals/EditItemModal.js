import React from 'react'
import { Modal } from 'antd';
import axios from "axios";
import { Form, Input, DatePicker, InputNumber } from "antd";

class EditItemModal extends React.Component {
  state = {
    visible: true,
    confirmLoading: false,
    itemId: null,
    item:{
       name: "",
       make: "",
       model: "", 
       serial_num: "", 
       category: "", 
       collection: "", 
       condition: "", 
       purchase_date: null, 
       quantity: "", 
       value: "", 
       tags: "", 
       location_id: null 
      }
  }
  componentDidMount() {
    const { itemId } = this.props
    axios.get(`/api/items/${itemId}`).then(res => {
      this.setState({item: res.data});
      console.log(this.state.item)
    })
  }
 
  handleNumberInputChange = (value) => {
    this.setState({quantity: value})
  };
  
  handleFloatInputChange = (value) => {
    this.setState({value: value})
  };
  
  handleChange = (e) => {
    const { name, value, } = e.target;
    this.setState({item: {...this.state.item, [name]: value, }});
  };
  
  handleDate = (date) => {
    this.setState({purchase_date: date})
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk =() => { 
    const { itemId } = this.props
    axios.patch(`/api/items/${itemId}`, {...this.state.item})
      .then( res => {
        console.log(res)
      })
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
      this.props.tab()
    }, 1000);
  };

  handleCancel = async() => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };


  render(){
    const { visible, confirmLoading, itemId } = this.state;
    const { name, make, model, serial_num, category, collection, condition, purchase_date, quantity, value, tags } = this.state.item;

    return(
      <Modal
        title='Edit Item'
        visible={visible}
        onOk={this.handleOk}
        confirmLoading={confirmLoading}
        onCancel={this.handleCancel}
      >
     {/* _________________________________FORM_______________________________ */}
        <div> 
          <Form onFinish={this.handleSubmit}>
            <Form.Item >
              <Input
              label="Name"
              required     
              autoFocus
              name='name'
              value={name}
              placeholder='Name'
              onChange={this.handleChange}
              />
            </Form.Item>
            <Form.Item >
              <Input
              label="Make"
              required     
              name='make'
              value={make}
              placeholder='Make'
              onChange={this.handleChange}
              />
            </Form.Item>
            <Form.Item >
              <Input
              label="Model"
              required     
              name='model'
              value={model}
              placeholder='Model'
              onChange={this.handleChange}
              />
            </Form.Item>
            <Form.Item >
              <Input
              label="Serial_num"
              required     
              name='serial_num'
              value={serial_num}
              placeholder='Serial_num'
              onChange={this.handleChange}
              />
            </Form.Item>
            <Form.Item>
              <Input
                label="Category"
                required
                name='category'
                value={category}
                placeholder='Category'
                onChange={this.handleChange}
              />
            </Form.Item>
            <Form.Item>
              <Input
              label="Collection"
              required
              name='collection'
              value={collection}
              placeholder='Collection'
              onChange={this.handleChange}
              />
            </Form.Item>
            <Form.Item>
              <Input
              label="Condition"
              required
              name='condition'
              value={condition}
              placeholder='Condition'
              onChange={this.handleChange}
              />
            </Form.Item>
            <Form.Item >
              <Input
              label="Purchase Date"
              placeholder="Purchase Date"
              required
              name='purchase_date'
              value={purchase_date}
              onChange={this.handleChange}
              />
            </Form.Item>
            <Form.Item >
              <InputNumber 
              type="integer"
              label="Quantity"
              required
              name='quantity'
              value={quantity}
              placeholder='Quantity'
              onChange={this.handleNumberInputChange}
              />
            </Form.Item>
            <Form.Item>
              <InputNumber
                label="Value"
                required
                name='value'
                value={value}
                defaultValue={0}
                placeholder='value'
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                onChange={this.handleFloatInputChange}
              />
            </Form.Item>
            <Form.Item>
              <Input
              label="Tags"
              required
              name='tags'
              value={tags}
              placeholder='Tags'
              onChange={this.handleChange}
              />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    )
  }
}
export default EditItemModal

