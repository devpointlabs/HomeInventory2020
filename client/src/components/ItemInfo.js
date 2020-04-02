import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

export default class RenderItem extends React.Component {
  state = { item: {}};

  componentDidMount() {
      const { itemId, locationId } = this.props
      axios.get(`/api/locations/${locationId}/items/${itemId}`).then((res) => {
      this.setState({item: res});
      console.log(this.state)
    }).catch((err) => {
      console.log(err)
    })
  }

 
  render() {
    const { item } = this.state
    return (
      <>
        <p>TEST</p>
      </>

    )
  }
}
const StyledA2 = styled.a`
color: #272829;
text-decoration: none;
`