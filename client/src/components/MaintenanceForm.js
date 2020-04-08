import React from "react";
import axios from "axios";
import { Form, Input, Button, DatePicker } from "antd";

class MaintenanceForm extends React.Component {
  state = {
    due_date: null,
    description: "",
  };

  handleSubmit = () => {
    axios.post("/api/homes/1/maintenances").then((res) => {
      console.log(res);
      this.setState({
      })
    });
  };

  handleDate = (date) => {
    this.setState({ due_date: date });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const {
      due_date, 
      description,
    } = this.state;
    return (
      <>
        <Form onFinish={this.handleSubmit}>
        <Form.Item>
            <DatePicker
              label="Due Date"
              placeholder="Due Date"
              autoFocus
              required
              name="due_date"
              value={due_date}
              onChange={this.handleDate}
            />
          </Form.Item>
          <Form.Item>
            <Input
              label="Description"
              required
              name="description"
              value={description}
              placeholder="Description"
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
  }
}
export default MaintenanceForm;