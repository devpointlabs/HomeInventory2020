import React from "react";
import axios from "axios";
import styled from "styled-components";
import Dropzone from "react-dropzone";
import Assessments from "./Assessments";
import Maintenances from "./Maintenances";
import HomeForm from "./forms/HomeForm";
import { MinusOutlined, PlusOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

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
        <StyledCon>
          <StyledHeader>
            <p> Assessment History </p>
          </StyledHeader>
          <StyledIcon>
            <MinusOutlined />
          </StyledIcon>
          <StyledIcon>
            <Link to="/add/assessment">
              <PlusOutlined />
            </Link>
          </StyledIcon>
          <StyledIcon>
            <EditOutlined />
          </StyledIcon>
        </StyledCon>
        <StyledTable>
          <table>
            <tr>
              <th>Date</th>
              <th>Land</th>
              <th>Structure</th>
              <th>Total</th>
            </tr>
          </table>
          <StyledLine />
          <Assessments homeId={home.id} />
        </StyledTable>
      </div>
    ));
  };
  renderMaintenances = () => {
    const { houses } = this.state;
    return houses.map((home) => (
      //make table here
      <div key={`maintenances-${home.id}`}>
        <StyledCon>
          <StyledHeader>
            <p> Maintenance Schedule </p>
          </StyledHeader>
          <StyledIcon>
            <MinusOutlined />
          </StyledIcon>
          <StyledIcon>
            <Link to="/add/maintenance">
              <PlusOutlined />
            </Link>
          </StyledIcon>
          <StyledIcon>
            <EditOutlined />
          </StyledIcon>
        </StyledCon>
        <StyledTable>
          <table>
            <tr>
              <th>Due Date</th>
              <th>Task</th>
            </tr>
          </table>
          <StyledLine />
          <Maintenances homeId={home.id} />
        </StyledTable>
      </div>
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

  renderHousePage = () => {
    const { houses } = this.state;
    if (houses.length !== 0) {
      return (
        <StyledRow>
          <StyledCol>
            <StyledBorder>
              <StyledImg></StyledImg>
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
        <>
          <HomeForm />
        </>
      );
    }
  };
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
const StyledCon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;
const StyledHeader = styled.div`
  margin-right: 60%;
`;

const StyledIcon = styled.div`
  cursor: pointer;
  font-size: 20px;
  margin: 0 5px;
`;

const StyledTable = styled.div`
  border: 1px solid grey;
  padding: 5px 20px;
  border-radius: 5px;
`;
const StyledLine = styled.div`
  width: 100%;
  height: 1px;
  background: grey;
`;
