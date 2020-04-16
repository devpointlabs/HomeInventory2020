import React from "react";
import axios from 'axios'

class  Receipts extends React.Component {
  
  state = {
    receipt: {},
    itemId: null,
    receiptid: null
  }

  async componentDidMount() {
    const { itemId } = this.props
    if (itemId !== null) {
      axios.get(`/api/items/${itemId}/receipts`).then((res) => {
        console.log(res)
        this.setState({receipt: res.data[0], itemId: itemId});
      }).catch((err) => {
        console.log(err)
      })
    }
  }
  
  componentDidUpdate() {
    const { itemId } = this.props
    if( itemId !== null && itemId !== this.state.itemId ) {
      console.log(this.state.itemId)
      console.log(itemId)
    axios.get(`/api/items/${itemId}/receipts`).then((res) => {
      console.log(res)
      this.setState({receipt: res.data[0], itemId});
    }).catch((err) => {
      console.log(err)
    })
   }
  }
  

  deleteReceipt() {
    const { receiptId, itemId } = this.state
    console.log('delete receipt hit', receiptId)
    axios.delete(`/api/items/${itemId}/receipts/${receiptId}`).then(res => {console.log(res)})
    this.setState({
      receipt: {}
    });
  }

  render() {
    const { receipt, itemId } = this.state

    if (receipt) {
      return (
        <>
          <h3>Receipt Info</h3>
          <p>Date: {receipt.date}</p>
          <p>Receipt Number: {receipt.receipt_num}</p>
          <p>Purchased From: {receipt.purchased_from}</p>
          <p>Price: ${receipt.price}</p>
          <p>Tax: ${receipt.tax}</p>
          <p>Image: {receipt.img}</p>
        </>
      )} else if ( itemId === null) {
        return (
          <>
          </>
        )} else {
          return (
            <>
            <p>No Receipt Found</p>
            </>
          )
        }
  }
}

  export default Receipts











