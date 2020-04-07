import React, { useContext } from 'react'
import { Menu, Icon, Button } from 'antd';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import Search from 'antd/lib/transfer/search';
import { AuthContext } from '../providers/AuthProvider';

const Navbar = (props) => {
  const data = useContext(AuthContext)
  const navBars = () => {
    const isLoggedIn = (data.user !== null) ? true : false
    // on refresh it goes to items every time no bueno
    // on refresh it shows home page with user log in then heads to item page
    if (isLoggedIn) {
      return (
        <>
        <Redirect to='/items' />
        <StyledNav>
          <StyledUl>
            <StyledItem as={Link} to='/house'><StyledDot></StyledDot></StyledItem>
            <StyledItem><StyledA as={Link} to='/items'>Items</StyledA></StyledItem>
            <StyledItem><StyledA as={Link} to='/album'>Album</StyledA></StyledItem>
            <StyledItem><StyledA as={Link} to='/policies'>Policies</StyledA></StyledItem>
            <StyledItem><StyledA as={Link} to='/reports'>Reports</StyledA></StyledItem>
            <StyledItem><StyledA as={Link} to='/inbox'>Inbox</StyledA></StyledItem>
            <StyledItem><StyledA onClick={() => data.handleLogout(props.history)}>Sign Out</StyledA></StyledItem>
          </StyledUl>
        </StyledNav>
        </>
      )
    } else {
      return (
        <>
        <Redirect to='/' />
        <StyledNav>
          <StyledUl>
            <StyledLogo><StyledA as={Link} to='/'>LOGO</StyledA></StyledLogo>
            <StyledLi><StyledButton as={Link} to='/register'>SIGN UP</StyledButton></StyledLi>
            <StyledLi><StyledA as={Link} to='/login'>SIGN IN</StyledA></StyledLi>
          </StyledUl>
        </StyledNav>
        </>
      )
    }
  }
  return (
    <>
      {navBars()}
    </>
  )
}

export default Navbar;


const StyledNav = styled.nav`
margin: 5vh 0px;
color: black;
font-size: 22px;
`
const StyledUl = styled.ul`
display: flex; 
align-items: center;
list-style-type: none;
`
const StyledLogo = styled.li`
margin-left: 0.5206vw;
margin-right: 64vw;
font-weight: bold;
cursor: pointer;
font-size: 25px;
`
const StyledLi = styled.li`
margin: 0 2.3vw;
cursor: pointer;
`
const StyledButton = styled.button`
border: none;
color: white;
font-weight: bold;
background: #008cff;
padding: 5px 15px;
cursor: pointer;
transition: all 0.3s ease-in-out;

&:hover {
box-shadow: 0 5px 10px #6bbcff;
transition: all 0.3s ease-in-out;
}
`
const StyledA = styled.a`
color: black;
text-decoration: none;
`
//logged in navbar

const StyledItem = styled.li`
margin: 0 1.5vw;
cursor: pointer;
font-size: 22px;
`

const StyledDot = styled.div`
height: 45px;
width: 45px;
background-color: #3381ff;
border-radius: 50%;
`
