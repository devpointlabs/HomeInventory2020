import React from 'react';
import axios from 'axios';
import { List, Divider } from 'antd'

export default class RenderItem extends React.Component {
  state = {
    item: {}
  };

  componentDidMount() {
    const { itemId } = this.props
    if (itemId !== null) {
      axios.get(`/api/items/${itemId}`).then((res) => {
        console.log(res)
        this.setState({ item: res.data });
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  componentDidUpdate() {
    const { itemId } = this.props
    if (itemId !== null && itemId !== this.state.item.id) {
      axios.get(`/api/items/${itemId}`).then((res) => {
        console.log(res)
        this.setState({ item: res.data });
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  render() {
    const { item } = this.state
    if (this.state.item.id) {
      return (
        <div style={{ margin: '18px' }}>
          <div>
            <h3>{item.name}</h3>
            <Divider />
            <h5>Make: {item.make}</h5>
            <h5>Model: {item.model}</h5>
            <h5>Serial Number: {item.serial_num}</h5>
            <h5>Category: {item.category}</h5>
            <h5>Collection: {item.collection}</h5>
            <h5>Condition: {item.condition}</h5>
            <h5>{item.purchase_date}</h5>
            <h5>Quantity: {item.quantity}</h5>
            <h5>Stated Value: {item.value}</h5>
            <h5>Tags: {item.tags}</h5>
          </div>
        </div>
      )
    }
    return (
      <>
      </>
    )
  }
}
