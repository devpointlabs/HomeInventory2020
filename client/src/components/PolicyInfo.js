import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Divider, List } from 'antd'

export default class RenderPolicy extends React.Component {
  state = {
    policy: {}
  };

  componentDidMount() {
    const { policyId, homeId } = this.props
    if (policyId !== null) {
      axios.get(`/api/homes/${homeId}/policies/${policyId}`).then((res) => {
        console.log(res)
        this.setState({ policy: res.data });
      }).catch((err) => {
        console.log(err)
      })
    }
  }
  componentDidUpdate() {
    const { policyId, homeId } = this.props
    if (policyId !== null && policyId !== this.state.policy.id) {
      axios.get(`/api/homes/${homeId}/policies/${policyId}`).then((res) => {
        console.log(res)
        this.setState({ policy: res.data });
      }).catch((err) => {
        console.log(err)
      })
    }
  }
  render() {
    const { policy } = this.state
    if (this.state.policy.id) {
      return (
        <>
        <div style={{ width: '100%', margin: '16px' }}>
          <h3>{policy.name}</h3>
          <StyledDivider />
          <p>Issuer: {policy.issuer}</p>
          <p>{policy.issue_date}</p>
          <p>Policy Number: {policy.policy_num}</p>
          <p>Policy Type: {policy.policy_type}</p>
          <p>Contact Info: {policy.contact_info}</p>
        </div>
        <Divider orientation="left">File</Divider>
        <div style={passiveFileDiv}>
        <List
          size="large"
          bordered
        >
          <List.Item>
            {policy.policy_file ? 
            <a href={policy.policy_file} width='auto' height='200px'>{policy.policy_file} </a>
            : 
            <p>No File Uploaded</p>
            }
  
          </List.Item>
        </List>
      </div>
      </>
      )
    }
    return (
      <>
      </>
    )
  }
}

const StyledDivider = styled.div`
clear: both;
display: block;
width: 95%;
height: 1px;
margin: 24px 0;
background: #919191;

`
const passiveFileDiv = {
  margin: '12px',
}