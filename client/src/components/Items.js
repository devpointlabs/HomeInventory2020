import React from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';

const Items = () => (
  <>
  <Row >
    <Col span={5}>
      <div style={{...divHead}}>
        <p>Locations Drop Down</p>
      </div>
    </Col>
    <Col span={5}>
      <div style={{...divHead}}>
        <p>Items</p>
      </div>
    </Col>
    <Col span={14}>
      <div style={{...divHead}}>
      <StyledA>Info</StyledA>
      <StyledA>Photos</StyledA>
      <StyledA>Receipts</StyledA>
      <StyledA>Files</StyledA>
      </div>
    </Col>
  </Row>
  <Row>
    <Col span={5}>
      <div style={{...divField}}>           
        List of Locations
      </div>
    </Col>
    <Col span={5}>
      <div style={{...divField}}>           
        List of Items
      </div>
    </Col>
    <Col span={14}>
      <div style={{...divField}}>           
        Info Display
      </div>
    </Col>  
  </Row>
  <Row>
    <Col span={5}>
    <div style={{...divFoot}}> 
      Bottom Nav
    </div>
    </Col>
    <Col span={5}>
    <div style={{...divFoot}}> 
      Bottom Nav
    </div>
    </Col>
    <Col span={14}>
    <div style={{...divFoot}}> 
      No Items
    </div>
    </Col>     
  </Row>
</>
)



const divHead = {
display: 'flex',
alignItems: 'center',
justifyContent: 'space-around',
height: 'auto',
width: 'auto',
fontSize: '19px',
color: '#272829',
border: '1px solid grey',
padding: '12px',
fontWeight: '400'
}
const divField = {
display: 'flex',


height: '30em',
width: 'auto',
fontSize: '18px',
color: '#272829',
border: '1px solid grey',
padding: '12px',
fontWeight: '300'
}
const divFoot = {
display: 'flex',
alignItems: 'center',
justifyContent: 'space-around',
height: 'auto',
width: 'auto',
fontSize: '19px',
color: '#272829',
border: '1px solid grey',
padding: '12px',
fontWeight: '400'
}
const StyledA = styled.a`
color: #272829;
text-decoration: none;
`

export default Items;