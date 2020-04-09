import React from "react";



const  Receipts = (props) => {
    const receipt = props.receipt
    console.log('receipt component')
    console.log(props)

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
    )} else {
      return (
        <>
        </>
      )
    }
  }

  export default Receipts











