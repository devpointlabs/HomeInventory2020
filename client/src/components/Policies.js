import React from "react";
import { Row, Col } from "antd";
import styled from "styled-components";
import axios from "axios";
import PolicyFileUploader from "./uploaders/PolicyFileUploader";
import { Button, List, Tooltip } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import PolicyInfo from "../components/PolicyInfo";
import { Link } from "react-router-dom";

class Policies extends React.Component {
  state = { 
    homes: [], 
    policies: [],
    policyId: null, 
    file: false,
    homeId: 0,
    tab: "info" 
    };

  async componentDidMount() {
    let homeData = await axios.get("/api/homes");
    console.log(homeData);
    this.setState({homeId: homeData.data[0].id}) 
    const { homeId } = this.state;
    let policyData = await axios.get(`/api/homes/${homeId}/policies`);
    console.log(policyData);
    this.setState({ policies: policyData.data });
    this.setState({ homes: homeData.data });
  }

  renderPolicies = () => {
    const { policies, policyId } = this.state;
    return policies.map((policy) => (
      <div
        key={policy.id}
        style={policy.id === policyId ? activeDiv : passiveDiv}
      >
        <StyledA2
          onClick={() => this.togglePolicies(policy.id)}
          style={policy.id === policyId ? activeA : {}}
        >
          {policy.name}
        </StyledA2>
        <br />
      </div>
    ));
  };

  togglePolicyFile = (bool) => {
    this.setState({file: bool});
  }

  togglePolicies = (targetId) => {
    this.setState({ ...this.state, policyId: targetId });
  };

  // Render information panel based on function above / active tab.
  renderPolicyInfo = () => {
    const { policyId, tab } = this.state
    if (policyId !== null) {
      if (tab === 'info') {
      return (
        <PolicyInfo
          ref='policy'
          policyId={this.state.policyId}
          homeId={this.state.homeId}
          update={this.togglePolicyFile}
        />
      )}
      if( tab === 'newFile') {
        return (
          <PolicyFileUploader homeId={this.state.homeId} policyId={this.state.policyId} update={this.updateFiles} />
        )
      }
    } 
  };

  renderButtons = () => {
    const { file } = this.state
    if(file === true) {
      return (
      <Tooltip title="Delete File">
        <Button shape="circle" onClick={() => this.deleteFile()}>
          <DeleteOutlined />
        </Button> 
      </Tooltip>
      )
    } else {
      return (
      <Tooltip title="Upload File">
        <Button shape="circle" onClick={() => this.uploadFile()}>
          <PlusOutlined />
        </Button>  
      </Tooltip>
      )
    }
  }

  deletePolicy = () => {
    const { homeId, policyId, policies } = this.state;
    axios
      .delete(`/api/homes/${homeId}/policies/${policyId}`)
      .then((res) => {
        console.log(res);
        const filteredPolicies = policies.filter(
          (policy) => policy.id !== policyId
        );
        this.setState({
          policies: filteredPolicies,
          homeId: 0,
          policyId: null,
          tab: "blank",
        });
        this.props.history.push('/policies')
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteFile = () => {
    this.refs.policy.deleteFile()
  }

  uploadFile = () => {
    this.setState({tab: 'newFile'});
  }
  updateFiles = () => {
    this.setState({tab: 'info'});
  }

  render() {

    return (
      <>
        <Row>
          <Col span={6}>
            <div style={{ ...divHead }}>
              <p>Policies</p>
            </div>
          </Col>
          <Col span={18}>
            <div style={{ ...divHead }}>
              <p>Info</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={6} style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ ...divField }}>{this.renderPolicies()}</div>
          </Col>
          <Col span={18} style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ ...divField }}>{this.renderPolicyInfo()}</div>
          </Col>
        </Row>
        <Row>
          {/* this is right below the names of the policies */}
          <Col span={6}>
            <div style={{ ...divFoot }}>
              <Button type="primary" shape="circle">
                <Link
                  to={{ pathname: "/add/policy", homeId: this.state.homeId }}
                >
                  <PlusOutlined />
                </Link>
              </Button>
              {this.state.locationId !== null ? (
                <>
                  <Button
                    type="primary"
                    shape="circle"
                    onClick={() => this.deletePolicy()}
                  >
                    <DeleteOutlined />
                  </Button>
                  <Button
                    type="primary"
                    shape="circle"
                  ><Link 
                  to={{ pathname: "/edit/policy", homeId:this.state.homeId, policyId:this.state.policyId}}>
                    <EditOutlined />
                  </Link>
                  </Button>
                </>
              ) : null}
            </div>
          </Col>
          <Col span={18}>
            <div style={{ ...divFoot }}>
              {this.state.policyId !== null ? (
                <>
                {this.renderButtons()}
                </>
              ) : null}
            </div>
          </Col>
        </Row>
      </>
    );
  }
}

// styling for selected menu options
const activeDiv = {
  height: "50px",
  backgroundColor: "#f0f0f0",
  boxShadow: "0px 2px 5px #888888",
  paddingTop: "12px",
  transition: 'all 0.2s ease-in-out',
};
const passiveDiv = { height: "50px", marginLeft: "14px", paddingTop: "12px" , transition: 'all 0.2s ease-in-out',};
const activeA = { color: "#1890ff", marginTop: "16px", paddingLeft: "6px" , transition: 'all 0.2s ease-in-out',};
const activeTab = { color: "#1890ff", textDecoration: "underline", transition: 'all 0.2s ease-in-out',};
// styling for layout of items page
const divHead = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  height: "auto",
  width: "auto",
  fontSize: "19px",
  color: "#272829",
  border: "1px solid grey",
  padding: "12px",
  fontWeight: "400",
};
const passiveFileDiv = {
  margin: "12px",
  cursor: "pointer",
};
const activeFileDiv = {
  margin: "12px",
  cursor: "pointer",
  backgroundColor: "#f0f0f0",
};
const divField = {
  display: "flex !important",
  flexDirection: "row !important",
  height: "30em",
  width: "100%",
  fontSize: "18px",
  color: "#272829",
  border: "1px solid grey",
  fontWeight: "300",
  overflow: "scroll",
};
const divFoot = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  minHeight: "58px",
  width: "auto",
  fontSize: "19px",
  color: "#272829",
  border: "1px solid grey",
  padding: "12px",
  fontWeight: "400",
};
//styling for name links
const StyledA = styled.h4`
  color: #272829;
  text-decoration: none;
  cursor: default
`;
const StyledA2 = styled.a`
  color: #272829;
  text-decoration: none;
`;
export default Policies;
