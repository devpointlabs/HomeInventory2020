import React from "react";
import { Row, Col } from "antd";
import styled from "styled-components";
import axios from "axios";
import Uploader from "./uploaders/FileUploader";
import { Button, List } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import PolicyForm from "../components/forms/PolicyForm";
import PolicyInfo from "../components/PolicyInfo";
import { Link } from "react-router-dom";

class Policies extends React.Component {
  state = { homes: [], policies: [], policyId: null, homeId: 1, tab: "info" };

  async componentDidMount() {
    const { homeId } = this.state;
    let policyData = await axios.get(`/api/homes/${homeId}/policies`);
    console.log(policyData);
    this.setState({ policies: policyData.data });
    // let homeData = await axios.get("/api/homes");
    // console.log(homeData);
    // this.setState({ homes: homeData.data });
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

  togglePolicies = (targetId) => {
    this.setState({ ...this.state, policyId: targetId });
  };

  // Toggles Info display
  toggleTab = (t) => {
    this.setState({ tab: t });
  };

  // Render information panel based on function above / active tab.
  renderPolicyInfo = () => {
    const { tab } = this.state;
    switch (tab) {
      case "info":
        return (
          <PolicyInfo
            policyId={this.state.policyId}
            homeId={this.state.homeId}
          />
        );
      case "files":
        return (
          <Uploader itemId={this.state.itemId} update={this.updateFiles} />
        );
      // case "newPolicy":
      //   return (
      //     <PolicyForm
      //       update={this.updateLocationList}
      //       homeId={this.state.homeId}
      //     />
      //   );
      default:
        return <></>;
    }
  };

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

  renderFiles = () => {
    const { files, fileId } = this.state;
    return files.map((file) => (
      <div
        style={fileId === file.id ? activeFileDiv : passiveFileDiv}
        key={file.id}
        onClick={() => this.setId(file.id)}
      >
        <List size="large" bordered>
          <List.Item>
            <a href={file.file} width="auto" height="200px">
              {file.name}{" "}
            </a>
          </List.Item>
        </List>
      </div>
    ));
  };

  // Function that toggles active file ID:
  setId = (id) => {
    this.setState({
      fileId: id,
    });
  };

  updateFiles = () => {
    this.setState({ filesLoaded: false });
  };

  deleteFile = (id) => {
    const { itemId, fileId, files } = this.state;
    axios
      .delete(``)
      .then((res) => {
        console.log(res);
        const filteredFiles = files.filter((f) => f.id !== fileId);
        this.setState({
          fileId: null,
          tab: "files",
          files: filteredFiles,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { tab, policyId } = this.state;
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
              <StyledA
                onClick={() => this.toggleTab("info")}
                style={tab === "info" && policyId !== null ? activeTab : {}}
              >
                Info
              </StyledA>
              <StyledA
                onClick={() => this.toggleTab("files")}
                style={tab === "files" && policyId !== null ? activeTab : {}}
              >
                Files
              </StyledA>
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
                    // onClick={() => this.updatePolicy()}
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
              {this.state.itemId !== null ? (
                <>
                  <Button shape="circle">
                    <EditOutlined />
                  </Button>
                  <Button shape="circle" onClick={() => this.deleteItem()}>
                    <DeleteOutlined />
                  </Button>
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
};
const passiveDiv = { height: "50px", marginLeft: "14px", paddingTop: "12px" };
const activeA = { color: "#1890ff", marginTop: "16px", paddingLeft: "6px" };
const activeTab = { color: "#1890ff", textDecoration: "underline" };
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
const StyledA = styled.a`
  color: #272829;
  text-decoration: none;
`;
const StyledA2 = styled.a`
  color: #272829;
  text-decoration: none;
`;
export default Policies;
