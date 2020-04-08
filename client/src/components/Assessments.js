import React from 'react';
import axios from 'axios';


export default class Assessments extends React.Component {
    state = {
        assessments: []
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

    renderAssessments = () => {
        const {  assessments } = this.state
        return  assessments.map( assessment => (
            <div key={ assessment.id }>
                <h1> Assessment </h1>
                <p>{ assessment.date }</p>
                <p>{ assessment.land_value }</p>
                <p>{ assessment.structure_value }</p>
                <p>{ assessment.total_value }</p>
            </div>
        ))
    }

    render() {

        return (
            <>
                {this.renderAssessments()}
            </>

        )
    }
}

