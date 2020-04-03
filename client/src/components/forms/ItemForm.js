import React from "react";
import axios from "axios";
import { Form, Input, DatePicker, InputNumber, Button } from "antd";
import moment from 'moment'

class ItemForm extends React.Component {
  state = { name: "", make: "", model: "", serial_num: "", category: "", collection: "", condition: "", heir: "", purchase_date: null, quantity: "", value: "", tags: "", location_id: null };

  componentDidMount(){
    const { locationId } = this.props
    this.setState({location_id: locationId});
  }

  handleSubmit = (e) => {
    axios.post("/api/items", { ...this.state, })
      .then( res => {
        console.log(res)
        this.setState({
          name: "", make: "", model: "", serial_num: "", category: "", collection: "", condition: "", heir: "", purchase_date: null, quantity: "", value: "", tags: "", location_id: null 
        });
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
    this.setState({ [name]: value, });
  };

  handleDate = (date) => {
    this.setState({purchase_date: date})
  }

  render() {
    const { name, make, model, serial_num, category, collection, condition, heir, purchase_date, quantity, value, tags } = this.state;
    return (
      <> 
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
          <Form.Item>
            <Input
            label="Heir"
            required
            name='heir'
            value={heir}
            placeholder='Heir'
            onChange={this.handleChange}
            />
          </Form.Item>
          <Form.Item >
            <DatePicker 
            label="Purchase Date"
            placeholder="Purchase Date"
            required
            name='purchase_date'
            value={purchase_date}
            onChange={this.handleDate}
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
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  };
}
export default ItemForm;