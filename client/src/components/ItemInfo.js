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
            <h2>{item.name}</h2>
            <Divider />
            <h4>Make: {item.make}</h4>
            <h4>Model: {item.model}</h4>
            <h4>Serial Number: {item.serial_num}</h4>
            <h4>Category: {item.category}</h4>
            <h4>Collection: {item.collection}</h4>
            <h4>Condition: {item.condition}</h4>
            <h4>{item.purchase_date}</h4>
            <h4>Quantity: {item.quantity}</h4>
            <h4>Stated Value: {item.value}</h4>
            <h4>Tags: {item.tags}</h4>
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
