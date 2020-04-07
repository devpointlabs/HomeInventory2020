import React from 'react';
import { Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { AuthConsumer } from '../providers/AuthProvider';
import styled from 'styled-components';


class Register extends React.Component {
  state = { name: '', email: '', password: '', passwordConfirmation: '', };

  handleSubmit = (e) => {
    // e.preventDefault();
    const { email, password, passwordConfirmation } = this.state;
    const { auth: { handleRegister, }, history, } = this.props;

    if (password === passwordConfirmation)
      handleRegister({ email, password, passwordConfirmation, }, history);
    else
      alert('Passwords Do Not Match!');
  };

  handleChange = (e) => {
    const { name, value, } = e.target;
    this.setState({ [name]: value, });
  };

  render() {
    const { name, email, password, passwordConfirmation, } = this.state;

    return (
      <StyledBackground>
        <StyledHeader>Join Home Inventory</StyledHeader>
        <StyledHeader2>Sign up with <a>Facebook</a> or <a>Google</a></StyledHeader2>
        <LineCon>
          <StyledLine></StyledLine>
          <StyledHeader2>or</StyledHeader2>
          <StyledLine></StyledLine>
        </LineCon>
        <Form onFinish={this.handleSubmit}>
          <Form.Item>
            <Input
              label="Email"
              required
              autoFocus
              name='email'
              value={email}
              placeholder='Email'
              onChange={this.handleChange}
            />
          </Form.Item>
          <Form.Item >
            <Input
              label="Name"
              required
              name='name'
              value={name}
              placeholder='Name'
              onChange={this.handleChange}
            />
          </Form.Item>
          <Form.Item>
            <Input as={StyledForm}
              label="Password"
              required
              name='password'
              value={password}
              placeholder='Password'
              type='password'
              onChange={this.handleChange}
            />
          </Form.Item>
          <Form.Item>
            <Input
              label="Password Confirmation"
              required
              name='passwordConfirmation'
              value={passwordConfirmation}
              placeholder='Password Confirmation'
              type='password'
              onChange={this.handleChange}
            />
          </Form.Item>
          <Form.Item>
            <StyledButton htmlType="submit">
              Sign up
            </StyledButton>
            <StyledLine2></StyledLine2>
            <StyledHeader2>Already have an account? <Link to='/login'>Log in</Link></StyledHeader2>
          </Form.Item>
        </Form>
      </StyledBackground>
    );
  };
};

export default class ConnectedRegister extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <Register {...this.props} auth={auth} />}
      </AuthConsumer>
    );
  };
};

const StyledForm = styled.input`
background: grey !important;
border: none !important;
`

const StyledBackground = styled.div`
border: black 1px solid;
margin: 10px 420px;
padding: 10px 25px;
`
const StyledHeader = styled.h1`
font-weight: bold;
font-size: 30px;
`
const StyledHeader2 = styled.h2`
font-size: 15px;
`
const LineCon = styled.div`
display: flex; 
flex-direction: row;
justify-content: center;
align-items: center;
margin-bottom: 20px;
`
const StyledLine = styled.div`
background: #adadad;
width: 250px;
height: 1px;
margin: 0px 15px;
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