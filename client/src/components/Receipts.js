import React from "react";
import axios from 'axios'
import { List, Button } from 'antd'

class Receipts extends React.Component {

  state = {
    receipt: null,
    itemId: null,
    photoId: null
  }

  async componentDidMount() {
    const { itemId } = this.props
    if (itemId !== null) {
      axios.get(`/api/items/${itemId}/receipts`).then((res) => {
        console.log(res)
        this.setState({ receipt: res.data[0], itemId: itemId });
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  componentDidUpdate() {
    const { itemId } = this.props
    if (itemId !== null && itemId !== this.state.itemId) {
      axios.get(`/api/items/${itemId}/receipts`).then((res) => {
        console.log(res)
        this.setState({ receipt: res.data[0], itemId });
      }).catch((err) => {
        console.log(err)
      })
    }
  }


  deleteReceipt() {
    const { receiptId, itemId } = this.state
    console.log('delete receipt hit', receiptId)
    axios.delete(`/api/items/${itemId}/receipts/${receiptId}`).then(res => { console.log(res) })
    this.setState({
      receipt: null
    });
    this.props.update(false)
  }



  render() {
    const { receipt, itemId } = this.state

    if (receipt) {
      return (
        <div style={{ margin: '18px' }}>
          <List
            size="large"
            bordered
          >
            <List.Item >
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start' }}>
                <h3>Receipt Info</h3>
                <p>Date: {receipt.date}</p>
                <p>Receipt Number: {receipt.receipt_num}</p>
                <p>Purchased From: {receipt.purchased_from}</p>
                <p>Price: ${receipt.price}</p>
                <p>Tax: ${receipt.tax}</p>
                <img src={receipt.img} height="200px" width="auto"/>
              </div>
            </List.Item>
          </ List>
        </div>
      )
    } else if (itemId === null) {
      return (
        <>
        </>
      )
    } else {
      return (
        <div style={{ margin: '18px' }}>
          <p>No Receipt Found</p>
        </div>
      )
    }
  }
}

export default Receipts











