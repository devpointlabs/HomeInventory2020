import React from "react";
import axios from "axios";
import styled from "styled-components";
import Dropzone from "react-dropzone";
import { Form, Input, DatePicker, InputNumber, Modal } from "antd";

class EditReceiptModal extends React.Component {
  state = {
    visible: true,
    confirmLoading: false,
    itemId: null,
    file: null,
    receipt: {
      id: null,
      date: null,
      receipt_num: "",
      purchased_from: "",
      price: "",
      tax: "",
      img: "",
    },
  };

  componentDidMount() {
    const { itemId, receiptId } = this.props;

    axios.get(`/api/items/${itemId}/receipts/${receiptId}`).then((res) => {
      console.log(res);
      this.setState({ receipt: res.data });
    });
  }

  handlePriceChange = (value) => {
    this.setState({ receipt: { ...this.state.receipt, price: value } });
  };

  handleTaxChange = (value) => {
    this.setState({ receipt: { ...this.state.receipt, tax: value } });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ receipt: { ...this.state.receipt, [name]: value } });
  };

  handleDate = (date) => {
    this.setState({ receipt: { ...this.state.receipt, date: date } });
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    const { itemId } = this.props;
    const { id } = this.state.receipt;
    let data = new FormData();
    const { file } = this.state;
    console.log("file: submit", file);
    data.append("file", file);
    const {
      date,
      receipt_num,
      purchased_from,
      price,
      tax,
    } =this.state.receipt;

    axios
      .patch(`/api/items/${itemId}/receipts/${id}/?date=${date}&receipt_num=${receipt_num}&purchased_from=${purchased_from}&price=${price}&tax=${tax}`, data, { ...this.state.receipt })
      .then((res) => {
        console.log(res);
      });
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      // The function below is passed from Item.js to hot-reload and change tab on item page.
      this.props.tab();
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  };

  onDrop = (files) => {
    console.log("files[0]", files[0]);
    this.setState({ file: files[0] });
  };

  handleCancel = async () => {
    console.log("Clicked cancel button");
    this.props.tab();
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible, confirmLoading, itemId } = this.state;
    const {
      date,
      receipt_num,
      purchased_from,
      price,
      tax,
      img,
    } = this.state.receipt;

    return (
      <div>
        <Modal
          title="Edit Receipt"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          {/* _________________________FORM_________________________ */}
          <>
            <Form onFinish={this.handleSubmit}>
              <Form.Item>
                <p>Purchase Date</p>
                <Input
                  placeholder="Purchase Date"
                  autoFocus
                  required
                  name="date"
                  value={date}
                  onChange={this.handleChange}
                />
              </Form.Item>
              <Form.Item>
                <p>Receipt Number</p>
                <Input
                  required
                  name="receipt_num"
                  value={receipt_num}
                  placeholder="Receipt Number"
                  onChange={this.handleChange}
                />
              </Form.Item>
              <Form.Item>
                <p>Purchased From</p>
                <Input
                  required
                  name="purchased_from"
                  value={purchased_from}
                  placeholder="Purchased From"
                  onChange={this.handleChange}
                />
              </Form.Item>
              <Form.Item>
                <p>Price</p>
                <InputNumber
                  required
                  name="price"
                  value={price}
                  defaultValue={0}
                  placeholder="price"
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  onChange={this.handlePriceChange}
                />
              </Form.Item>
              <Form.Item>
                <p>Tax</p>
                <InputNumber
                  required
                  name="tax"
                  value={tax}
                  defaultValue={0}
                  placeholder="tax"
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  onChange={this.handleTaxChange}
                />
              </Form.Item>
              <Form.Item>
                <Dropzone onDrop={this.onDrop} multiple={false}>
                  {({ getRootProps, getInputProps }) => (
                    <StyledDrop>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Drag or drop a picture of your receipt</p>
                      </div>
                    </StyledDrop>
                  )}
                </Dropzone>
              </Form.Item>
            </Form>
          </>
        </Modal>
      </div>
    );
  }
}

const StyledDrop = styled.div`
  border: 2.5px dashed black;
  width: 200px;
  height: 200px;
  padding: 50px 10px;
  background: #e3e3e3;
  text-align: center;
  margin: 10px 10px;
  cursor: pointer;
`;

export default EditReceiptModal;
