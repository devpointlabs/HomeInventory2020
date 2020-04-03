import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

export default class RenderItem extends React.Component {
  state = {
    item: {}
  };

  componentDidUpdate() {
    const { itemId, locationId } = this.props
    if( itemId !== this.state.item.id ) {
    axios.get(`/api/locations/${locationId}/items/${itemId}`).then((res) => {
      console.log(res)
      this.setState({item: res.data});
    }).catch((err) => {
      console.log(err)
    })
   }
  }

  render() {
    const { item } = this.state
    return (
      <>
        <p>{item.name}</p>
      </>

    )
  }
}
const StyledA2 = styled.a`
color: #272829;
text-decoration: none;
`