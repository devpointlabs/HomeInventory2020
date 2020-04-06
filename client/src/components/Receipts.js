import React from "react";
import axios from "axios";

export default class Receipts extends React.Component {
  state = {
    receipt: {},
  };

  componentDidMount() {
    const { itemId, receiptId } = this.props;
    axios
      .get(`/api/items/${itemId}/receipts`)
      .then((res) => {
        console.log(res);
        this.setState({ receipt: res.data[0] });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidUpdate() {
    const { itemId, receiptId } = this.props;
    if (receiptId !== this.state.receipt.id) {
      axios
        .get(`/api/items/${itemId}/receipts/${receiptId}`)
        .then((res) => {
          console.log(res);
          this.setState({ receipt: res.data });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  render() {
    const { receipt } = this.state;

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
    );
  }
}
