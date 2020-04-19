import React from "react";
import axios from "axios";
import { Form, Modal, Input, InputNumber } from "antd";


class EditAssessmentModal extends React.Component {
  state = {
    visible: false,
    confirmLoading: false,
    assessment: {
      id: null,
      date: null,
      land_value: "",
      structure_value: "",
      total_value: ""
    }
  };
  componentDidMount() {   
    const {  assessmentId } = this.props

    axios.get(`/api/homes/1/assessments/${assessmentId}`)
    .then(res => {
      console.log(res)
      this.setState({assessment: res.data});
    })
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk =() => { 
    const { assessmentId } = this.props

    axios.patch(`/api/homes/1/assessments/${assessmentId}`, { ...this.state.assessment })
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

  handleDate = (date) => {
    this.setState({assessment: {...this.state.assessment, date: date.target.value }});
  };

  handleLandValueChange = (value) => {
    this.setState({assessment: {...this.state.assessment,  land_value: value }});
  };

  handleStructureValueChange = (value) => {
    this.setState({assessment: {...this.state.assessment,  structure_value: value }});
  };

  handleTotalValueChange = (value) => {
    this.setState({assessment: {...this.state.assessment,  total_value: value }});
  };

  render() {
    const {
      date, 
      land_value, 
      structure_value,
      total_value
    } = this.state.assessment
    const { visible, confirmLoading } = this.state

    return (
      <Modal
      title='Edit Assessment'
      visible={visible}
      onOk={this.handleOk}
      confirmLoading={confirmLoading}
      onCancel={this.handleCancel}
    >
      {/* _________________________FORM_________________________ */}
      <>
        <div>
        <Form>
        <Form.Item >
        <p>Date</p>
            <Input
              label="Date"
              placeholder="Assessment Date"
              autoFocus
              required
              name="date"
              value={date}
              onChange={this.handleDate}
              style={inputWidth}
            />
          </Form.Item>
          <Form.Item>
          <p>Land Value</p>
            <InputNumber
              label="Land Value"
              required
              name="land_value"
              value={land_value}
              defaultValue={0}
              placeholder="price"
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              onChange={this.handleLandValueChange}
              style={inputWidth}
              />
          </Form.Item>
          <Form.Item>
          <p>Structure Value</p>
            <InputNumber
              label="Structure Value"
              required
              name="structure_value"
              value={structure_value}
              defaultValue={0}
              placeholder="Structure Value"
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              onChange={this.handleStructureValueChange}
              style={inputWidth}
            />
          </Form.Item>
          <Form.Item>
          <p>Total Value</p>
            <InputNumber
              label="Total Value"
              required
              name="total_value"
              value={total_value}
              defaultValue={0}
              placeholder="Total Value"
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              onChange={this.handleTotalValueChange}
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


export default EditAssessmentModal;