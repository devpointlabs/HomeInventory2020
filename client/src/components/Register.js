import React from 'react';
import { PageHeader, Button, Form, Input } from 'antd';
import { AuthConsumer } from '../providers/AuthProvider'


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
      <> 
        <PageHeader as='h1' textAlign='center'>Register</PageHeader>
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
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  };
};

export default class ConnectedRegister extends React.Component {
  render() {
    return (
      <AuthConsumer>
        { auth => <Register {...this.props} auth={auth} /> }
      </AuthConsumer>
    );
  };
};
