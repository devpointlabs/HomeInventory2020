import React from "react";
import axios from "axios";
import styled from 'styled-components';
import { Form, Input, Button, DatePicker } from "antd";

class EditMaintenances extends React.Component {
  state = {
    due_date: null,
    task: "",
  };

  handleSubmit = () => {
    const {id} = this.props.location
    console.log(id)
    axios.patch(`/api/homes/1/maintenances/${id}`, this.state).then((res) => {
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
        <StyledBackground>
          <StyledHeader>Add Maintenance Schedule</StyledHeader>
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
font-size: 25px;
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
export default EditMaintenances;