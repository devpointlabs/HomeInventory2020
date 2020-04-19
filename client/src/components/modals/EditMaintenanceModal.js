import React from "react";
import axios from "axios";
import { Form, Input, Modal } from "antd";

class EditMaintenanceModal extends React.Component {
  state = {
    visible: false,
    confirmLoading: false,
    item: {
    due_date: null,
    task: ""
    }
  };

  componentDidMount() {
    const {id, home} = this.props

    axios.get(`/api/homes/${home}/maintenances/${id}`)
    .then(res => {
      this.setState({item: res.data});
    })
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk =() => { 
    const {id, home} = this.props

    axios.patch(`/api/homes/${home}/maintenances/${id}`, { ...this.state.item })
    .then( res => {
      console.log(res)
    })
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.props.update()
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 1000);
  };

  handleCancel = async() => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };


  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({item: {...this.state.item, [name]: value }});
  };

  render() {
    const { due_date, task } = this.state.item
    const { visible, confirmLoading } = this.state

    return (
      <Modal
      title='Edit Maintenance Item'
      visible={visible}
      onOk={this.handleOk}
      confirmLoading={confirmLoading}
      onCancel={this.handleCancel}
    >
      {/* _________________________FORM_________________________ */}
      <>
        <div>
          <Form>
            <Form.Item>
              <p>Due Date</p>
              <Input
                label="Due Date"
                placeholder="Due Date"
                autoFocus
                required
                name="due_date"
                value={due_date}
                onChange={this.handleChange}
                style={inputWidth}
              />
            </Form.Item>
            <Form.Item>
              <p>Task</p>
              <Input
                label="Description"
                required
                name="task"
                value={task}
                placeholder="Description"
                onChange={this.handleChange}
                style={inputWidth}
              />
            </Form.Item>
          </Form>
        </div>
      </>
      </Modal>
    );
  }
}

const inputWidth = {
  width: '180px'
}

export default EditMaintenanceModal;