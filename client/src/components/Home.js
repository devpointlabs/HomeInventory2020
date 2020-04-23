import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Img from '../images/DGB_Hero.jpg';
// import { PageHeader } from 'antd';
// 'https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2536&q=80'
const Home = () => (
  <>
  <StyledBackground src='https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2536&q=80' width="100%" height='auto'/>
  <StyledDiv>
  <StyledHeader>
    Document &
    <br/>
    organize
    <br/>
    your home
  </StyledHeader>
   <br/>
   <StyledA><Link to='/login'>Get started ></Link></StyledA>
   </StyledDiv>
   </>
)

const StyledBackground = styled.img`
position: absolute;
top: 0;
z-index: -1;
`

const StyledDiv = styled.div`
margin-top: 80px;
margin-left: 12.5vw;
`
// const StyledImg = styled.div`
// position: absolute;
// top: 44.5vh;
// left: 42.5vw;
// z-index: -1;
// width: 600px;
// height: 600px;
// background: #c7e3ff;
// `

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
