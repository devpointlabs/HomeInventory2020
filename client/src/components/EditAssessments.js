import React from "react";
import axios from "axios";
import styled from 'styled-components';
import { Form, Input, InputNumber, Button, DatePicker } from "antd";

class EditAssessments extends React.Component {
  state = {
    date: null,
    land_value: "",
    structure_value: "",
    total_value: "",
  };

  handleSubmit = () => {
    const {id} = this.props.location
    console.log(id)
    axios.patch(`/api/homes/1/assessments/${id}`, this.state).then((res) => {
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
        <StyledBackground>
          <StyledHeader>Add Assessment History</StyledHeader>
        <Form onFinish={this.handleSubmit}>
        <Form.Item>
        <p>Date</p>
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
          <p>Land Value</p>
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
          <p>Structure Value</p>
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
          <p>Total Value</p>
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
export default EditAssessments;