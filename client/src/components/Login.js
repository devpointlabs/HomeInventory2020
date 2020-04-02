import React from 'react';
import { PageHeader, } from 'antd';
import { Button, Form, Input } from 'antd';
import { AuthConsumer } from '../providers/AuthProvider'

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
        <PageHeader as='h1' textAlign='center'>Login</PageHeader>
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
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </>
    )
  }
}

export default class ConnectedLogin extends React.Component {
  render() {
    return (
      <AuthConsumer>
        { auth => <Login {...this.props} auth={auth} />}
      </AuthConsumer>
    )
  }
}

