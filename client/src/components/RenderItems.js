import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

export default class RenderItems extends React.Component {
  state = { items: [], id: 0 };


   //Function is passed to new item form to hot-reload added item. 
   updateItemList = () => {
    const { items } = this.state

  }

  renderItems = () => {
    const { items } = this.state
    const { toggleItemId } = this.props
    return items.map(item => (
      <div key={item.id}>
        <StyledA2 onClick={() => toggleItemId(item.id)}>{item.name}</StyledA2>
      </div>
    ))
  }

  render() {
    return (
      <>
        {this.renderItems()}
      </>

    )
  }
}
const StyledA2 = styled.a`
color: #272829;
text-decoration: none;
`