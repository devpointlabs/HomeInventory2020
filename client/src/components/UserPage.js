import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import styled from 'styled-components';
import { UserOutlined } from '@ant-design/icons';

const UserPage = (props) => {
  const data = useContext(AuthContext)
  return (
    <StyledCon>
      <StyledBackground>
        <StyledIconRight><UserOutlined /></StyledIconRight>
        <StyledButton onClick={() => data.handleLogout(props.history)}>Sign out</StyledButton>
      </StyledBackground>
    </StyledCon>
  )
}

export default UserPage;

const StyledCon = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`
const StyledIconRight = styled.div`
height: 200px;
width: 200px;
margin-top: 30px;
margin-bottom: 70px;
color: black;
font-size: 120px;
text-align: center;
background-color: #D4D4D4;
border-radius: 50%;
transition: all 0.3s ease-in-out;
`
const StyledBackground = styled.div`
margin: 10px 420px;
padding: 10px 20px;
height: 400px;
width: 300px;
display: flex;
flex-direction: column;
align-items: center;
`;

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
`;