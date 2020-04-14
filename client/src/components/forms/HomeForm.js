import React from "react";
import axios from "axios";
import { Form, Input, InputNumber, Button, DatePicker } from "antd";
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

class HomeForm extends React.Component {
  state = {
    address: "",
    zip_code: "",
    square_footage: "",
    lot_size: "",
    purchase_date: null,
    purchase_price: "",
    image: "",
  };

  handleSubmit = () => {
    const newHome = { ...this.state }
    axios.post("/api/homes", newHome).then((res) => {
      console.log(res);
      this.setState({
        address: "",
        zip_code: "",
        square_footage: "",
        lot_size: "",
        purchase_date: null,
        purchase_price: "",
        image: "",
      })
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleZipChange = (value) => {
    this.setState({ zip_code: value });
  };

  handleFootageChange = (value) => {
    this.setState({ square_footage: value });
  };

  handleLotSizeChange = (value) => {
    this.setState({ lot_size: value });
  };

  handleDate = (date) => {
    this.setState({ purchase_date: date });
  };

  handlePriceChange = (value) => {
    this.setState({ purchase_price: value });
  };

  render() {
    const {
      address,
      zip_code,
      square_footage,
      lot_size,
      purchase_date,
      purchase_price,
      image,
    } = this.state;
    return (
      <>
        <StyledBackground>
          <StyledHeader>Add House Information</StyledHeader>
          <Form onFinish={this.handleSubmit}>
            <p>Address</p>
            <Form.Item>
              <Input
                label="Address"
                required
                autoFocus
                name="address"
                value={address}
                placeholder="Address"
                onChange={this.handleChange}
              />
            </Form.Item>
            <Form.Item>
              <p>Zip Code</p>
              <InputNumber
                label="Zip Code"
                required
                name="zip_code"
                value={zip_code}
                placeholder="Zip Code"
                onChange={this.handleZipChange}
              />
            </Form.Item>
            <Form.Item>
              <p>Square Footage</p>
              <InputNumber
                label="Square Footage"
                required
                name="square_footage"
                value={square_footage}
                placeholder="Square Footage"
                onChange={this.handleFootageChange}
              />
            </Form.Item>
            <Form.Item>
              <p>Lot Size</p>
              <InputNumber
                label="Lot Size"
                required
                name="lot_size"
                value={lot_size}
                placeholder="Lot size in acres"
                onChange={this.handleLotSizeChange}
              />
            </Form.Item>
            <Form.Item>
              <p>Purchase Date</p>
              <DatePicker
                label="Purchase Date"
                placeholder="Purchase Date"
                required
                name="purchase_date"
                value={purchase_date}
                onChange={this.handleDate}
              />
            </Form.Item>
            <Form.Item>
              <p>Purchase Price</p>
              <InputNumber
                label="Purchase Price"
                required
                name="purchase_price"
                value={purchase_price}
                defaultValue={0}
                placeholder="price"
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                onChange={this.handlePriceChange}
              />
            </Form.Item>
            <Form.Item>
              <StyledButton htmlType="submit">
                Submit
            </StyledButton>
            </Form.Item>
          </Form>
        </StyledBackground>
      </>
    );
  }
}

const StyledBackground = styled.div`
border: black 1px solid;
margin: 10px 420px;
padding: 10px 25px;
`
const StyledHeader = styled.h1`
font-weight: bold;
font-size: 30px;
`
const StyledButton = styled.button`
border: none;
color: white;
font-weight: bold;
background: #008cff;
padding: 5px 15px;
cursor: pointer;
width: 100%;
transition: all 0.3s ease-in-out;

&:hover {
box-shadow: 0 5px 10px #6bbcff;
transition: all 0.3s ease-in-out;
}
`
const StyledLine2 = styled.div`
background: #adadad;
margin-top: 45px;
width: 100%;
height: 1px;
`
export default HomeForm;