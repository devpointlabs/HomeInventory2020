import React from "react";
import axios from "axios";
import { Form, Input, DatePicker, InputNumber } from "antd";

class ItemForm extends React.Component {
  state = {
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
    location_id: null,
  };

  componentDidMount() {
    const { locationId } = this.props;
    this.setState({ location_id: locationId });
  }

  handleSubmit = (e) => {
    axios.post("/api/items", { ...this.state }).then((res) => {
      console.log(res);
      this.setState({
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
        location_id: null,
      });
      this.props.update(res);
    });
  };

  handleNumberInputChange = (value) => {
    this.setState({ quantity: value });
  };

  handleFloatInputChange = (value) => {
    this.setState({ value: value });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleDate = (date) => {
    this.setState({ purchase_date: date });
  };

  render() {
    const {
      name,
      make,
      model,
      serial_num,
      category,
      collection,
      condition,
      purchase_date,
      quantity,
      value,
      tags,
    } = this.state;
    return (
      <div>
        <Form onFinish={this.handleSubmit}>
          <p>Name</p>
          <Form.Item>
            <Input
              required
              autoFocus
              name="name"
              value={name}
              placeholder="Name"
              onChange={this.handleChange}
            />
          </Form.Item>
          <p>Make</p>
          <Form.Item>
            <Input
              required
              name="make"
              value={make}
              placeholder="Make"
              onChange={this.handleChange}
            />
          </Form.Item>
          <p>Model</p>
          <Form.Item>
            <Input
              required
              name="model"
              value={model}
              placeholder="Model"
              onChange={this.handleChange}
            />
          </Form.Item>
          <p>Serial Number</p>
          <Form.Item>
            <Input
              required
              name="serial_num"
              value={serial_num}
              placeholder="Serial Number"
              onChange={this.handleChange}
            />
          </Form.Item>
          <p>Category</p>
          <Form.Item>
            <Input
              required
              name="category"
              value={category}
              placeholder="Category"
              onChange={this.handleChange}
            />
          </Form.Item>
          <p>Collection</p>
          <Form.Item>
            <Input
              required
              name="collection"
              value={collection}
              placeholder="Collection"
              onChange={this.handleChange}
            />
          </Form.Item>
          <p>Condition</p>
          <Form.Item>
            <Input
              required
              name="condition"
              value={condition}
              placeholder="Condition"
              onChange={this.handleChange}
            />
          </Form.Item>
          <p>Purchase Date</p>
          <Form.Item>
            <DatePicker
              placeholder="Purchase Date"
              required
              name="purchase_date"
              value={purchase_date}
              onChange={this.handleDate}
            />
          </Form.Item>
          <p>Quantity</p>
          <Form.Item>
            <InputNumber
              type="integer"
              required
              name="quantity"
              value={quantity}
              placeholder="Quantity"
              onChange={this.handleNumberInputChange}
            />
          </Form.Item>
          <p>Value</p>
          <Form.Item>
            <InputNumber
              required
              name="value"
              value={value}
              defaultValue={0}
              placeholder="Value"
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              onChange={this.handleFloatInputChange}
            />
          </Form.Item>
          <p>Tags</p>
          <Form.Item>
            <Input
              required
              name="tags"
              value={tags}
              placeholder="Tags"
              onChange={this.handleChange}
            />
          </Form.Item>
        </Form>
      </div>
    );
  }
}
export default ItemForm;
