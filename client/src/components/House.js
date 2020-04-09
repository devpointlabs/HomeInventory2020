import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import Assessments from './Assessments';
import Maintenances from './Maintenances';

export default class House extends React.Component {
    state = {
        houses: []
    };
    componentDidMount() {
        axios.get('/api/homes').then((res) => {
            console.log(res)
            this.setState({ houses: res.data });
            console.log(this.state.houses)
        })
            .catch((err) => {
                console.log(err)
            })
    }

    renderHouses = () => {
        const { houses } = this.state
        return houses.map(home => (
            <div key={home.id}>
                <h2>Home Information:</h2>
                <p>Address: {home.address}</p>
                <p>Zip: {home.zip_code}</p>
                <p>Square Footage: {home.square_footage}</p>
                <p>Lot Size: {home.lot_size} Acres</p>
                <p>Year Built: {home.purchase_date}</p>
                <p>Purchase Price: {`$${home.purchase_price}`}</p>
            </div>
        ))
    }
    renderAssessments = () => {
        const { houses } = this.state
        return houses.map(home => (
            <div key={`assessments-${home.id}`}>
                <Assessments homeId={home.id} />
            </div>
        ))

    }
    renderMaintenances = () => {
        const { houses } = this.state
        return houses.map(home => (
            <div key={`maintenances-${home.id}`}>
                <Maintenances homeId={home.id} />
            </div>
        ))

    }

    renderHousePage = () => {
        const { houses } = this.state
        if( houses !== null) {
        return (
            <StyledRow>
                <StyledCol>
                    <StyledBorder>
                        <StyledImg></StyledImg>
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
        )} else {
            return (
                <div>
                    <h2>Add House Information</h2>
                    <h3>Render Form Here</h3>
                </div>
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

const StyledImg = styled.div`
width: 500px;
height: 500px;
background: #D4D4D4;
margin: 30px;
`