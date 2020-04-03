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
    if (this.state.item.id) {
    return (
      <>
        <h3>{item.name}</h3>
        <p>Make: {item.make}</p>
        <p>Model: {item.model}</p>
        <p>Serial Number: {item.serial_num}</p>
        <p>Category: {item.category}</p>
        <p>Collection: {item.collection}</p>
        <p>Condition: {item.condition}</p>
        <p>Heir: {item.heir}</p>
        <p>{item.purchase_date}</p>
        <p>Quantity: {item.quantity}</p>
        <p>Stated Value: {item.value}</p>
        <p>Tags: {item.tags}</p>
      </>

    )}
    return (
      <>
      </>
    )
  }
}
const StyledA2 = styled.a`
color: #272829;
text-decoration: none;
`
// t.string "name"
// t.string "make"
// t.string "model"
// t.string "serial_num"
// t.string "category"
// t.string "collection"
// t.string "condition"
// t.string "heir"
// t.date "purchase_date"
// t.integer "quantity"
// t.float "value"
// t.string "tags"