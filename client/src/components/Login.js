import React from 'react';
import { Form, Input } from 'antd';
import { AuthConsumer } from '../providers/AuthProvider'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  state = { email: '', password: '' }

  handleSubmit = (e) => {
    // e.preventDefault();
    const { email, password, } = this.state;
    this.props.auth.handleLogin({ email, password, }, this.props.history);
  }

  handleChange = (e) => {
    const { name, value, } = e.target;
    this.setState({ [name]: value, });
  }

  render() {
    const { email, password, } = this.state;
    return (
      <>
      <StyledBackgroundImg src='https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2536&q=80' width="100%" height='auto'/>
      <StyledBackground>
        <StyledHeader>Log Into Home Inventory</StyledHeader>
        <StyledHeader2>Log in with <a>Facebook</a> or <a>Google</a></StyledHeader2>
        <LineCon>
          <StyledLine></StyledLine>
          <StyledHeader2>or</StyledHeader2>
          <StyledLine></StyledLine>
        </LineCon>
        <Form onFinish={this.handleSubmit}>
          <Form.Item>
            <Input
              label="Email"
              autoFocus
              required
              name='email'
              value={email}
              placeholder='Email'
              onChange={this.handleChange}
            />
          </Form.Item>
          <Form.Item>
            <Input
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
            <StyledButton htmlType="submit">
              Log in
            </StyledButton>
            <StyledLine2></StyledLine2>
            <StyledHeader2>Don't have an account? <Link to='/register'>Sign up</Link></StyledHeader2>
          </Form.Item>
        </Form>
      </ StyledBackground>
      </>
    )
  }
}

export default class ConnectedLogin extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <Login {...this.props} auth={auth} />}
      </AuthConsumer>
    )
  }
}

const StyledBackgroundImg = styled.img`
position: absolute;
top: 0;
z-index: -1;
`
const StyledForm = styled.input`
background: grey !important;
border: none !important;
`

const StyledBackground = styled.div`
border: black 1px solid;
background: white;
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

