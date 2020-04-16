import React from "react";
import axios from 'axios'
import { List } from 'antd'

class  Receipts extends React.Component {
  
  state = {
    receipt: null,
    itemId: null,
    receiptid: null
  }

  async componentDidMount() {
    const { itemId } = this.props
    if (itemId !== null) {
      axios.get(`/api/items/${itemId}/receipts`).then((res) => {
        console.log(res)
        this.setState({receipt: res.data[0], itemId});   
        if (this.state.receipt) {
          this.props.update(true)
        } else {
          this.props.update(false)
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
  
  componentDidUpdate() {
    const { itemId } = this.props
    if( itemId !== null && itemId !== this.state.itemId ) {
    axios.get(`/api/items/${itemId}/receipts`).then((res) => {
      console.log(res)
      this.setState({receipt: res.data[0], itemId});
      if (this.state.receipt) {
        this.props.update(true)
      } else {
        this.props.update(false)
      }
    }).catch((err) => {
      console.log(err)
    })
   }
  }
  
  deleteReceipt() {
    const { receipt, itemId } = this.state
    axios.delete(`/api/items/${itemId}/receipts/${receipt.id}`).then(res => {console.log(res)})
    this.setState({
      receipt: null
    });
    this.props.update(false)
  }

  render() {
    const { receipt, itemId } = this.state

    if (receipt) {
      return (
       <div style={{margin: '18px'}}>
        <List
        size="large"
        bordered
        >
          <List.Item >
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'start'}}>
          <h3>Receipt Info</h3>
          <p>Date: {receipt.date}</p>
          <p>Receipt Number: {receipt.receipt_num}</p>
          <p>Purchased From: {receipt.purchased_from}</p>
          <p>Price: ${receipt.price}</p>
          <p>Tax: ${receipt.tax}</p>
          <p>Image: {receipt.img}</p>
          </div>
          </List.Item>
        </ List>
        </div> 
      )} else if ( itemId === null) {
        return (
          <>
          </>
        )} else {
          return (
            <div style={{margin: '10px'}}>
            <p>No Receipt Found</p>
            </div>
          )
        }
  }
}

  export default Receipts











