import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


export default class Assessments extends React.Component {
    state = {
        assessments: [], assessmentId: 0,
    };

    componentDidMount() {
        const { homeId, } = this.props
        axios.get(`/api/homes/${homeId}/assessments`).then((res) => {
            console.log(res)
            this.setState({ assessments: res.data });
        }).catch((err) => {
            console.log(err)
        })
    }

    componentDidUpdate() {
        const { assessmentId } = this.state
        this.props.getId(assessmentId)
    }

    reload = () => {
        const { homeId, } = this.props
        axios.get(`/api/homes/${homeId}/assessments`).then((res) => {
            console.log(res)
            this.setState({ assessments: res.data });
        }).catch((err) => {
            console.log(err)
        })
    }

    renderAssessments = () => {

        // make this render columns
        const { assessments, assessmentId } = this.state
        if (assessments.length !== 0) {
            return assessments.map(assessment => (
                <StyledTableRow key={assessment.id} onClick={() => this.setState({ assessmentId: assessment.id })} style={assessment.id === assessmentId ? activeDiv : passiveDiv}>
                    <tr>
                        <StyledTableData>{assessment.date}</StyledTableData>
                        <StyledTableData>${assessment.land_value}</StyledTableData>
                        <StyledTableData>${assessment.structure_value}</StyledTableData>
                        <StyledTableData>${assessment.total_value}</StyledTableData>
                    </tr>
                </StyledTableRow>
            ))
        } else {
            return <p>Add data here using the plus symbol</p>
        }
    }

    render() {

        return (
            <>
                {this.renderAssessments()}
            </>

        )
    }
}
const StyledTableRow = styled.div`
margin-top: 5px; 
cursor: pointer;
`
const StyledTableData = styled.td`
padding: 0px 5px; 
`
const activeDiv = { border: '2px solid #9ecaed', borderRadius: '5px', boxShadow: '0 0 10px #9ecaed', transition: '0.2s all ease-in-out' }
const passiveDiv = { border: 'none', transition: '0.2s all ease-in-out' }

