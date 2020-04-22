import React from "react";
import axios from "axios";
import { Form, Input, InputNumber, Button } from "antd";

class LocationForm extends React.Component {
  state = { name: ""};


  handleSubmit = () => {
    const newLocation = {...this.state}
    if (this.state.name.length===0) {
      alert ("Location name cannot be empty")
      return
    }
    axios.post("/api/locations", newLocation)
      .then( res => {
        this.setState({ name: ""});
        this.props.update(res)
      })
  }

  handleChange = (e) => {
    const { name, value, } = e.target;
    this.setState({ [name]: value, });
  };

  render() {
    const { name } = this.state;
    return (
      <> 
        <Form onFinish={this.handleSubmit}>
          <Form.Item
          rules={[{ required: true }]}
            >     
            <Input
            rules={[{ required: true }]}
            label="Name"
            required
            autoFocus
            name='name'
            value={name}
            placeholder='Name'
            onChange={this.handleChange}
            />
          </Form.Item>
        </Form>
      </>
    );
  };
}
export default LocationForm;