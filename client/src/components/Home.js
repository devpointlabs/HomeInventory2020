import React from 'react';
import styled from 'styled-components';
import { PageHeader } from 'antd';

const Home = () => (
  <StyledDiv>
  <StyledHeader>
    Powerful
    <br/>
    features for
    <br/>
    working
  </StyledHeader>
   <br/>
   <StyledA>Action link ></StyledA>
   <StyledImg></StyledImg>
   </StyledDiv>
)
const StyledDiv = styled.div`
margin-top: 100px;
margin-left: 23.5vw;
`
const StyledImg = styled.div`
position: absolute;
top: 44.5vh;
left: 42.5vw;
z-index: -1;
width: 600px;
height: 600px;
background: #c7e3ff;
`

const StyledHeader = styled.div`
font-size: 80px;
font-weight: bold;
color: black;
`

const StyledA = styled.a`
font-size: 25px;
text-decoration: none;
`

export default Home;