import React from 'react'
import { Menu, Icon } from 'antd';
import styled from 'styled-components';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const Navbar = () => (

  // if statement here if the user is logged in??
  //use links here to render each tab
  <Menu mode="horizontal">
    <Menu.Item key="mail">
      <a href="">Items</a>
    </Menu.Item>
    <SubMenu title={<span>Album</span>}>
      <MenuItemGroup title="Item 1">
        <Menu.Item key="setting:1">Option 1</Menu.Item>
        <Menu.Item key="setting:2">Option 2</Menu.Item>
      </MenuItemGroup>
      <MenuItemGroup title="Item 2">
        <Menu.Item key="setting:3">Option 3</Menu.Item>
        <Menu.Item key="setting:4">Option 4</Menu.Item>
      </MenuItemGroup>
    </SubMenu>
    <Menu.Item>
      <a href="">Policies</a>
    </Menu.Item>
    <Menu.Item>
      <a href="">Reports</a>
    </Menu.Item>
    <Menu.Item>
      <a href="">Inbox</a>
    </Menu.Item>
    {/* <Menu.Item as={SignInCon} >
      <a href="">Sign in</a>
    </Menu.Item>
    <Menu.Item key="app">
      <a href="">Sign up</a>
    </Menu.Item> */}
  </Menu>
)
// const SignInCon = styled.div`
// float: right;
// height: 32px;
// padding: 6px;
// margin-top: 8px;
// display: none;
// background: none;
// `;


export default Navbar;