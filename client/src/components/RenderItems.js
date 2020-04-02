import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

export default class RenderItems extends React.Component {
  state = { items: [], id: 0 };

  componentDidUpdate() {
      const { locationId } = this.props
      const { id } = this.state
    if( locationId !== id ) {
      axios.get(`/api/locations/${locationId}/items`).then((res) => {
      this.setState({ items: res.data, id: locationId});
    }).catch((err) => {
      console.log(err)
    })
    }
  }

  renderItems = () => {
    const { items } = this.state
    return items.map(item => (
      <div key={item.id}>
        <StyledA2>{item.name}</StyledA2>
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