import React from 'react';
import axios from 'axios';



export default class RenderItem extends React.Component {
  state = {
    item: {}
  };

  componentDidMount() {
    const { itemId } = this.props
    if (itemId !== null) {
      axios.get(`/api/items/${itemId}`).then((res) => {
        console.log(res)
        this.setState({item: res.data});
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  componentDidUpdate() {
    const { itemId } = this.props
    if( itemId !== null && itemId !== this.state.item.id ) {
    axios.get(`/api/items/${itemId}`).then((res) => {
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
