import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Assessments from './Assessments';
import Maintenances from './Maintenances';
import HomeForm from './forms/HomeForm';
import { MinusOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export default class House extends React.Component {
    state = {
        houses: [], maintenanceId: 0, assessmentId: 0, homeId: 0,
    };
    componentDidMount() {
        axios.get('/api/homes').then((res) => {
            console.log(res)
            this.setState({ houses: res.data });
        })
            .catch((err) => {
                console.log(err)
            })
    }

    getHomeId = (id) => {
        const { homeId } = this.state
        if (homeId !== id) {
            return this.setState({ homeId: id })
        }

    }

    getMaintenanceId = (id) => {
        const { maintenanceId } = this.state
        if (maintenanceId !== id) {
            return this.setState({ maintenanceId: id })
        }
    }

    deleteMaintenance = () => {
        const { maintenanceId, homeId } = this.state
        axios.delete(`/api/homes/${homeId}/maintenances/${maintenanceId}`)
            .then(res => {
            })
            .catch(err => {
                console.log(err)
            })
    }


    getAssessmentId = (id) => {
        const { assessmentId } = this.state
        if (assessmentId !== id) {
            return this.setState({ assessmentId: id })
        }

    }

    // need to get home id
    deleteAssessment = () => {
        const { assessmentId, homeId } = this.state
        axios.delete(`/api/homes/${homeId}/assessments/${assessmentId}`)
            .then(res => {
            })
            .catch(err => {
                console.log(err)
            })
    }

    renderHouses = () => {
        const { houses } = this.state
        return houses.map(home => (
            this.getHomeId(home.id),
            <div key={home.id}>
                <StyledCon>
                    <StyledHeaderHome>
                        <h2>Home Information</h2>
                    </StyledHeaderHome>
                    <StyledIcon>
                        <Link><MinusOutlined /></Link>
                    </StyledIcon>
                    <StyledIcon>
                        <Link to=''><PlusOutlined /></Link>
                    </StyledIcon>
                    <StyledIcon>
                    <Link to={{ pathname: '/edit/home', home: home.id }}>
                            <EditOutlined />
                        </Link>
                    </StyledIcon>
                </StyledCon>
                <p>Address: {home.address}</p>
                <p>Zip: {home.zip_code}</p>
                <p>Square Footage: {home.square_footage}</p>
                <p>Lot Size: {home.lot_size} Acres</p>
                <p>Year Built: {home.purchase_date}</p>
                <p>Purchase Price: {`$${home.purchase_price}`}</p>
            </div >
        ))
    }

    renderMaintenances = () => {
        const { houses } = this.state
        return houses.map(home => (
            <div key={`maintenances-${home.id}`}>
                <StyledCon>
                    <StyledHeader>
                        <p> Maintenance Schedule </p>
                    </StyledHeader>
                    <StyledIcon>
                        <Link><MinusOutlined onClick={this.deleteMaintenance} /></Link>
                    </StyledIcon>
                    <StyledIcon>
                        <Link to='/add/maintenance'><PlusOutlined /></Link>
                    </StyledIcon>
                    <StyledIcon>
                        <Link to={{ pathname: '/edit/maintenance', id: this.state.maintenanceId, home: home.id }}>
                            <EditOutlined />
                        </Link>
                    </StyledIcon>
                </StyledCon>
                <StyledTable>
                    <table>
                        <tr>
                            <StyledTableDate >Due Date</StyledTableDate >
                            <StyledTableTask >Task</StyledTableTask >
                        </tr>
                    </table>
                    <StyledLine />
                    <Maintenances homeId={home.id} getId={this.getMaintenanceId} />
                </StyledTable>
            </div>
        ))

    }

    renderAssessments = () => {
        const { houses } = this.state
        return houses.map(home => (
            <div key={`assessments-${home.id}`}>
                <StyledCon>
                    <StyledHeader>
                        <p> Assessment History </p>
                    </StyledHeader>
                    <StyledIcon>
                        <Link><MinusOutlined onClick={this.deleteAssessment} /></Link>
                    </StyledIcon>
                    <StyledIcon>
                        <Link to='/add/assessment'><PlusOutlined /></Link>
                    </StyledIcon>
                    <StyledIcon>
                        <Link to={{ pathname: '/edit/assessment', id: this.state.assessmentId, home: home.id }}>
                            <EditOutlined />
                        </Link>
                    </StyledIcon>
                </StyledCon>
                <StyledTable>
                    <table>
                        <tr>
                            <StyledTableDate>Date</StyledTableDate>
                            <StyledTableTask2>Land</StyledTableTask2>
                            <StyledTableTask2>Structure</StyledTableTask2>
                            <StyledTableTask2>Total</StyledTableTask2>
                        </tr>
                    </table>
                    <StyledLine />
                    <Assessments homeId={home.id} getId={this.getAssessmentId} />
                </StyledTable>
            </div>
        ))

    }

    renderHomePhoto = () => {
        const { houses } = this.state;
        return houses.map((house) => (
            <StyledImg key={house.id}>
                <img src={house.image} width="100%" height="100%" />
            </StyledImg>
        ));
    };

    renderHousePage = () => {
        const { houses } = this.state
        if (houses.length !== 0) {
            return (
                <StyledRow>
                    <StyledCol>
                        <StyledBorder>
                            {this.renderHomePhoto()}
                        </StyledBorder>
                        <StyledBorder>
                            {this.renderHouses()}
                        </StyledBorder>
                    </StyledCol>
                    <StyledCol>
                        <StyledBorder>
                            <StyledSection>
                                {this.renderMaintenances()}
                            </StyledSection>
                            <StyledSection>
                                {this.renderAssessments()}
                            </StyledSection>
                        </StyledBorder>
                    </StyledCol>
                </StyledRow>
            )
        } else {
            return (
                <>
                    <HomeForm />
                </>
            )
        }

    }
    render() {
        return (
            <>
                {this.renderHousePage()}
            </>
        )
    }
}
const StyledRow = styled.div`
display: flex;
`

const StyledSection = styled.div`
height: 50%;
`

const StyledCol = styled.div`
display: flex; 
flex-direction: column;
width: 50%;
`

const StyledBorder = styled.div`
border: 1px solid  grey;
padding: 30px;
height: 100%;
`
const StyledCon = styled.div`
display: flex; 
flex-direction: row;
align-items: center;
margin-bottom: 20px;
`
const StyledHeader = styled.div`
margin-right: 60%;
`
const StyledHeaderHome = styled.div`
margin-right: 50%;
`

const StyledIcon = styled.div`
cursor: pointer;
font-size: 20px;
margin: 0 5px;
color: grey !important;
transition: 0.2s all ease-in-out;

&:hover {
color: #1890ff;
transition: 0.2s all ease-in-out;

}
`

const StyledTable = styled.div`
border: 1px solid grey;
padding: 5px 20px;
border-radius: 5px;
`
const StyledLine = styled.div`
width: 100%;
height: 1px;
background: grey;
`
const StyledTableDate = styled.div`
margin-left: 5px;
display: inline;
`
const StyledTableTask = styled.div`
margin-left: 32px;
display: inline;
`
const StyledTableTask2 = styled.div`
margin-left: 63px;
display: inline;
`
const StyledImg = styled.div`
margin: 30px;
border: 2px solid black;
cursor: pointer;
transition: all 0.3s ease-in-out;

&:hover {
  box-shadow: 0 5px 10px black;
  transition: all 0.3s ease-in-out;
  }
`