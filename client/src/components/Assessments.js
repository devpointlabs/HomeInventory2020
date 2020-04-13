import React from 'react';
import axios from 'axios';
import { Table, Tag } from 'antd';
const { Column, ColumnGroup } = Table;


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

        // make this render columns
        const { assessments } = this.state
        if (assessments.length !== 0) {
            return assessments.map(assessment => (
                <div key={assessment.id}>
                    <tr>
                        <input type="checkbox" name="name1" />
                        <td>{assessment.date}</td>
                        <td>${assessment.land_value}</td>
                        <td>${assessment.structure_value}</td>
                        <td>${assessment.total_value}</td>
                    </tr>
                </div>
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

