import React from "react";
import axios from "axios";
import { Form, Input, Button, DatePicker } from "antd";

class MaintenanceForm extends React.Component {
  state = {
    due_date: null,
    task: "",
  };

  handleSubmit = () => {
    axios.post("/api/homes/1/maintenances", this.state).then((res) => {
      console.log(res);
      this.setState({
        due_date: null,
        task: ""
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
      task,
    } = this.state;
    return (
      <>
        <div>
          <Form onFinish={this.handleSubmit}>
            <Form.Item>
              <p>Due Date</p>
              <DatePicker
                label="Due Date"
                placeholder="Due Date"
                autoFocus
                required
                name="due_date"
                value={due_date}
                onChange={this.handleDate}
                style={inputWidth}
              />
            </Form.Item>
            <Form.Item>
              <p>Task</p>
              <Input
                label="Description"
                required
                name="task"
                value={task}
                placeholder="Description"
                onChange={this.handleChange}
                style={{width: '280px'}}
              />
            </Form.Item>
          </Form>
        </div>
      </>
    );
  }
}


export default MaintenanceForm;

const inputWidth = {
  width: '180px'
}