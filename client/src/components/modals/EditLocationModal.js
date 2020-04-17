
import React from 'react'
import axios from "axios";
import { Form, Input, InputNumber, Modal } from "antd";

class EditLocationModal extends React.Component {

  state = {
    visible: true,
    confirmLoading: false,
    itemId: null,
    location: { 
      name: "", 
      square_footage: "", 
      description: ""
    }
  } 
  
  componentDidMount() {
    const { locationId }= this.props

    axios.get(`/api/locations/${locationId}`)
    .then(res => {
      console.log(res)
      this.setState({location: res.data});
    })
  }
  
  handleChange = (e) => {
    const { name, value, } = e.target;

    this.setState({location: {...this.state.location, [name]: value, }});
  };

  handleNumberInputChange = (value) => {
    this.setState({location: {...this.state.location, square_footage: value}})
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk =() => { 
    const { locationId } = this.props

    axios.patch(`/api/locations/${locationId}`, { ...this.state.location })
    .then( res => {
      console.log(res)
    })
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.props.tab('blank')
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 1000);
  };

  handleCancel = async() => {
    console.log('Clicked cancel button');
    this.props.tab('blank')
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible, confirmLoading } = this.state;
    const { name, square_footage, description} = this.state.location

    return (
      <div>
        <Modal
          title='Edit Location'
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          {/* _________________________FORM_________________________ */}
          <> 
            <Form onFinish={this.handleSubmit}>
              <Form.Item >
                <Input
                label="Name"
                required     
                autoFocus
                name='name'
                value={name}
                placeholder='Name'
                onChange={this.handleChange}
                />
              </Form.Item>
              <Form.Item >
                <InputNumber 
                label="Square Footage"
                required
                name='square_footage'
                value={square_footage}
                placeholder='Square Footage'
                onChange={this.handleNumberInputChange}
                />
              </Form.Item>
              <Form.Item >
                <Input
                label="Description"
                required     
                name='description'
                value={description}
                placeholder='Description'
                onChange={this.handleChange}
                />
              </Form.Item>
            </Form>
          </>
        </Modal>
      </div>
    );
  }
}

export default EditLocationModal
