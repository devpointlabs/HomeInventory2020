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

    deleteAssessment = () => {
        const { homeId, } = this.props
        const { assessmentId } = this.state
        axios.delete(`/api/homes/${homeId}/assessments/${assessmentId}`)
            .then(res => {
                console.log('deleted')
            })
            .catch(err => {
                console.log(err)
            })
    }



    renderAssessments = () => {

        // make this render columns
        const { assessments, assessmentId } = this.state
        console.log(this.state.assessmentId)
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
                <div onClick={this.deleteAssessment}>delete</div>
                <Link to={{pathname: '/edit/assessment', id: this.state.assessmentId}}>
                    edit
                </Link>
            </>

        )
    }
}
const StyledTableRow = styled.div`
margin-top: 5px; 
`
const StyledTableData = styled.td`
padding: 0px 5px; 
`
const activeDiv = { border: '2px solid #9ecaed', borderRadius: '5px',  boxShadow: '0 0 10px #9ecaed'}
const passiveDiv = {border: 'none' }

