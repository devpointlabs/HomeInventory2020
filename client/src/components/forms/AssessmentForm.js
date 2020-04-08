import React from "react";
import axios from "axios";
import { Form, Input, InputNumber, Button, DatePicker } from "antd";

class AssessmentForm extends React.Component {
  state = {
    date: null,
    land_value: "",
    structure_value: "",
    total_value: "",
  };

  handleSubmit = () => {
    //gonna need a home to post this assessment to
    axios.post("/api/homes/1/assessments").then((res) => {
      console.log(res);
      this.setState({
        date: null,
        land_value: "",
        structure_value: "",
        total_value: "",
      })
    });
  };

  handleDate = (date) => {
    this.setState({ date: date });
  };

  handleLandValueChange = (value) => {
    this.setState({ land_value: value });
  };

  handleStructureValueChange = (value) => {
    this.setState({ structure_value: value });
  };

  handleTotalValueChange = (value) => {
    this.setState({ total_value: value });
  };

  render() {
    const {
      date, 
      land_value, 
      structure_value,
      total_value
    } = this.state;
    return (
      <>
        <Form onFinish={this.handleSubmit}>
        <Form.Item>
            <DatePicker
              label="Date"
              placeholder="Assessment Date"
              autoFocus
              required
              name="date"
              value={date}
              onChange={this.handleDate}
            />
          </Form.Item>
          <Form.Item>
            <InputNumber
              label="Land Value"
              required
              name="land_value"
              value={land_value}
              defaultValue={0}
              placeholder="price"
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              onChange={this.handleLandValueChange}
              />
          </Form.Item>
          <Form.Item>
            <InputNumber
              label="Structure Value"
              required
              name="structure_value"
              value={structure_value}
              defaultValue={0}
              placeholder="Structure Value"
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              onChange={this.handleStructureValueChange}
            />
          </Form.Item>
          <Form.Item>
            <InputNumber
              label="Total Value"
              required
              name="total_value"
              value={total_value}
              defaultValue={0}
              placeholder="Total Value"
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              onChange={this.handleTotalValueChange}
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
export default AssessmentForm;