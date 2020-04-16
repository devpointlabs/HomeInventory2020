import React from "react";
import axios from 'axios'

class  Receipts extends React.Component {
  
  state = {
    receipts: [],
  }

  async componentDidMount() {
    const receiptData = await axios.get(`/api/items/${this.props.itemId}/receipts`)
    console.log(receiptData)
    this.setState({
      receipts: receiptData.data
    });
  }

  render() {
    const { receipts } = this.state
    const receipt = receipts[0]
    if (receipts.length > 0) {
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
      )} else {
        return (
          <>
          </>
        )}
  }
}

  export default Receipts











