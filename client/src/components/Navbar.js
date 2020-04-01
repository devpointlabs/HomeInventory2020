import React from 'react'
import { Menu, Icon, Button } from 'antd';
import styled from 'styled-components';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const Navbar = () => (
<StyledNav>
  <StyledUl>
    <StyledLogo><StyledA>LOGO</StyledA></StyledLogo>
    <StyledLi><StyledButton>SIGN UP</StyledButton></StyledLi>
    <StyledLi><StyledA>SIGN IN</StyledA></StyledLi>
  </StyledUl>
</StyledNav>
  // if statement here if the user is logged in??
  //use links here to render each tab
  // <Menu mode="horizontal">
  //   <Menu.Item key="mail">
  //     <a href="">Items</a>
  //   </Menu.Item>
  //   <SubMenu title={<span>Album</span>}>
  //     <MenuItemGroup title="Item 1">
  //       <Menu.Item key="setting:1">Option 1</Menu.Item>
  //       <Menu.Item key="setting:2">Option 2</Menu.Item>
  //     </MenuItemGroup>
  //     <MenuItemGroup title="Item 2">
  //       <Menu.Item key="setting:3">Option 3</Menu.Item>
  //       <Menu.Item key="setting:4">Option 4</Menu.Item>
  //     </MenuItemGroup>
  //   </SubMenu>
  //   <Menu.Item>
  //     <a href="">Policies</a>
  //   </Menu.Item>
  //   <Menu.Item>
  //     <a href="">Reports</a>
  //   </Menu.Item>
  //   <Menu.Item>
  //     <a href="">Inbox</a>
  //   </Menu.Item>
  //   <Menu.Item as={SignInCon} >
  //     <a href="">Sign in</a>
  //   </Menu.Item>
  //   <Menu.Item key="app">
  //     <a href="">Sign up</a>
  //   </Menu.Item>
  // </Menu>
)
// const SignInCon = styled.div`
// float: right;
// height: 32px;
// padding: 6px;
// margin-top: 8px;
// display: none;
// background: none;
// `;

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


export default Navbar;