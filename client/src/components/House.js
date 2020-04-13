import React from "react";
import axios from "axios";
import styled from "styled-components";
import Dropzone from "react-dropzone";
import Assessments from "./Assessments";
import Maintenances from "./Maintenances";
import { Button } from "antd";

export default class House extends React.Component {
  state = {
    houses: [],
    homes: [],
  };
  componentDidMount() {
    axios
      .get("/api/homes")
      .then((res) => {
        console.log(res);
        this.setState({ houses: res.data });
        console.log(this.state.houses);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  renderHouses = () => {
    const { houses } = this.state;
    return houses.map((home) => (
      <div key={home.id}>
        <h2>Home Information:</h2>
        <p>Address: {home.address}</p>
        <p>Zip: {home.zip_code}</p>
        <p>Square Footage: {home.square_footage}</p>
        <p>Lot Size: {home.lot_size} Acres</p>
        <p>Year Built: {home.purchase_date}</p>
        <p>Purchase Price: {`$${home.purchase_price}`}</p>
      </div>
    ));
  };
  renderAssessments = () => {
    const { houses } = this.state;
    return houses.map((home) => (
      <div key={`assessments-${home.id}`}>
        <Assessments homeId={home.id} />
      </div>
    ));
  };
  renderMaintenances = () => {
    const { houses } = this.state;
    return houses.map((home) => (
      <div key={`maintenances-${home.id}`}>
        <Maintenances homeId={home.id} />
      </div>
    ));
  };

  renderHomePhoto = () => {
    const { houses } = this.state;
    return houses.map((house) => (
      <StyledImg key={house.id}>
        <img src={house.image} width="500px" height="500px" />
      </StyledImg>
    ));
  };

  onDrop = (files) => {
    let data = new FormData();
    data.append("file", files[0]);
    axios
      .post(`/api/homes`, data)
      .then((res) => {
        console.log(res);
        this.setState({ homes: [...this.state.homes, res.data] });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //   <Dropzone onDrop={this.onDrop} multiple={false}>
  //   {({ getRootProps, getInputProps }) => (
  //     <StyledDrop>
  //       <div {...getRootProps()}>
  //         <input {...getInputProps()} />
  //         <p>Drag or drop a picture of your home</p>
  //       </div>
  //     </StyledDrop>
  //   )}
  // </Dropzone>

  renderHousePage = () => {
    const { houses } = this.state;
    if (houses !== null) {
      return (
        <StyledRow>
          <StyledCol>
            <StyledBorder>
              <Dropzone onDrop={this.onDrop} multiple={false}>
                  {({ getRootProps, getInputProps }) => (
                    <StyledDrop>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Drag or drop a picture of your home</p>
                      </div>
                    </StyledDrop>
                  )}
                </Dropzone>
              {this.renderHomePhoto()}
              {/* <Button>Edit Photo</Button> */}
            </StyledBorder>
            <StyledBorder>{this.renderHouses()}</StyledBorder>
          </StyledCol>
          <StyledCol>
            <StyledBorder>
              <StyledSection>{this.renderMaintenances()}</StyledSection>
              <StyledSection>{this.renderAssessments()}</StyledSection>
            </StyledBorder>
          </StyledCol>
        </StyledRow>
      );
    } else {
      return (
        <div>
          <h2>Add House Information</h2>
          <h3>Render Form Here</h3>
        </div>
      );
    }
  };
  render() {
    return <>{this.renderHousePage()}</>;
  }
}
const StyledRow = styled.div`
  display: flex;
`;

const StyledSection = styled.div`
  height: 50%;
`;

const StyledCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const StyledBorder = styled.div`
  border: 1px solid grey;
  padding: 30px;
  height: 100%;
`;

const StyledImg = styled.div`
  width: 500px;
  height: 500px;
  background: #d4d4d4;
  margin: 30px;
`;

const StyledDrop = styled.div`
  border: 2.5px dashed black;
  width: 500px;
  height: 500px;
  padding: 50px 10px;
  background: #e3e3e3;
  text-align: center;
  margin: 10px 10px;
  cursor: pointer;
`;
