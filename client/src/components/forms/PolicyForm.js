import React from "react";
import axios from "axios";
import styled from "styled-components";
import { Form, Input, InputNumber, Button, DatePicker } from "antd";

class PolicyForm extends React.Component {
  state = {
    name: "",
    issuer: "",
    issue_date: null,
    policy_num: "",
    policy_type: "",
    contact_info: "",
  };

  handleSubmit = (props) => {
    const newPolicy = {...this.state}
    axios.post(`/api/homes/${this.props.location.homeId}/policies`, newPolicy).then( res => {
      this.setState({
        name: "",
        issuer: "",
        issue_date: null,
        policy_num: "",
        policy_type: "",
        contact_info: "",
      });
      this.props.history.goBack()
    });
  };
  handleDate = (date) => {
    this.setState({ issue_date: date });
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    const {
      name,
      issuer,
      issue_date,
      policy_num,
      policy_type,
      contact_info,
    } = this.state;
    return (
      <>
        <StyledBackground>
          <StyledHeader>Add Policy</StyledHeader>
          <Form onFinish={this.handleSubmit}>
            <p>Name</p>
            <Form.Item>
              <Input
                label="Name"
                required
                autoFocus
                name="name"
                value={name}
                placeholder="Name"
                onChange={this.handleChange}
              />
            </Form.Item>
            <p>Issuer</p>
            <Form.Item>
              <Input
                label="Issuer"
                required
                name="issuer"
                value={issuer}
                placeholder="Issuer"
                onChange={this.handleChange}
              />
            </Form.Item>
            <p>Policy Number</p>
            <Form.Item>
              <Input
                label="Policy Number"
                required
                name="policy_num"
                value={policy_num}
                placeholder="Policy Number"
                onChange={this.handleChange}
              />
            </Form.Item>
            <p>Policy Type</p>
            <Form.Item>
              <Input
                label="Policy Type"
                required
                name="policy_type"
                value={policy_type}
                placeholder="Policy Type"
                onChange={this.handleChange}
              />
            </Form.Item>
            <p>Contact Information</p>
            <Form.Item>
              <Input
                label="Contact Information"
                required
                name="contact_info"
                value={contact_info}
                placeholder="Contact Information"
                onChange={this.handleChange}
              />
            </Form.Item>
            <Form.Item>
              <p>Issue Date</p>
              <DatePicker
                label="Date"
                placeholder="Issue Date"
                required
                name="issue_date"
                value={issue_date}
                onChange={this.handleDate}
              />
            </Form.Item>
            <Form.Item>
              <StyledButton htmlType="submit">Submit</StyledButton>
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
`;
const StyledHeader = styled.h1`
  font-weight: bold;
  font-size: 25px;
`;
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
`;
const StyledLine2 = styled.div`
  background: #adadad;
  margin-top: 45px;
  width: 100%;
  height: 1px;
`;
export default PolicyForm;
