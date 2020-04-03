import React from "react";
import axios from "axios";
import { Form, Input, InputNumber, Button } from "antd";

class LocationForm extends React.Component {
  state = { name: "", square_footage: "", description: ""};


  handleSubmit = () => {
    axios.post("/api/locations", { ...this.state, })
      .then( res => {
        console.log(res)
      })
  }

  handleChange = (e) => {
    const { name, value, } = e.target;
    this.setState({ [name]: value, });
  };

  handleNumberInputChange = (value) => {
    this.setState({square_footage: value})
  };


  render() {
    const { name, square_footage, description} = this.state;
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
            <InputNumber 
            label="Square Footage"
            required
            name='square_footage'
            value={square_footage}
            placeholder='Square Footage'
            onChange={this.handleNumberInputChange}
            />
          </Form.Item>
          <Form.Item >
            <Input
            label="Description"
            required     
            name='description'
            value={description}
            placeholder='Description'
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
export default LocationForm;