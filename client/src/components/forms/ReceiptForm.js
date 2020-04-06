import React from "react";
import axios from "axios";
import { Form, Input, DatePicker, InputNumber, Button } from "antd";
import moment from 'moment'

class ReceiptForm extends React.Component {
  state = {date: null, receipt_num: "", purchased_from: "", price: "", tax: "", img: "" };
  
  handleSubmit = (e) => {
    axios.post("/api/receipts", { ...this.state, })
      .then( res => {
        console.log(res)
        this.setState({
          date: null, receipt_num: "", purchased_from: "", price: "", tax: "", img: ""
        });
      })
  }

  handlePriceChange = (value) => {
    this.setState({price: value})
  };

  handleTaxChange = (value) => {
    this.setState({tax: value})
  };

  handleChange = (e) => {
    const { name, value, } = e.target;
    this.setState({ [name]: value, });
  };

  handleDate = (date) => {
    this.setState({date: date})
  }

  render() {
    const { date, receipt_num, purchased_from, price, tax, img} = this.state;
    return (
      <> 
        <Form onFinish={this.handleSubmit}>
          <Form.Item >
            <DatePicker 
            label="Purchase Date"
            placeholder="Purchase Date"
            autoFocus
            required
            name='date'
            value={date}
            onChange={this.handleDate}
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
export default ReceiptForm;



