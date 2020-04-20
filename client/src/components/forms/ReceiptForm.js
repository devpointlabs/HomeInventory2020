import React from "react";
import axios from "axios";
import { Form, Input, DatePicker, InputNumber, Button } from "antd";
import RecieptPhotoUploader from "../uploaders/RecieptPhotoUploader";


class ReceiptForm extends React.Component {
  state = { date: null, receipt_num: "", purchased_from: "", price: "", tax: "", img: "" , file:""};

  handleSubmit = () => {
    const { receipt_num, purchased_from, price, tax, file, date} = this.state

    axios.post(`/api/items/${this.props.itemId}/receipts?date=${date}&receipt_num=${receipt_num}&purchased_from=${purchased_from}&price=${price}&tax=${tax}`, file)
      .then(res => {
        console.log(res)
      })
  }

  handlePriceChange = (value) => {
    this.setState({ price: value })
  };

  handleTaxChange = (value) => {
    this.setState({ tax: value })
  };

  handleChange = (e) => {
    const { name, value, } = e.target;
    this.setState({ [name]: value });
  };

  handleDate = (date) => {
    this.setState({ date: date })
  }
  
  postPhoto = (data) => {
    console.log(`this`)
    console.log(data)
        this.setState({
          file: data
        })
  }

  render() {
    const { date, receipt_num, purchased_from, price, tax, img } = this.state;
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
            <RecieptPhotoUploader itemId={this.props.itemId} upload={this.postPhoto} />
          </Form.Item>
        </Form>
      </>
    );
  };
}
export default ReceiptForm;


