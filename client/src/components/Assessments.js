import React from 'react';
import axios from 'axios';
import { Table, Tag } from 'antd';
import CustomTable from './CustomTable';
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
        const { assessments } = this.state
        return assessments.map(assessment => (
                <CustomTable info={assessment} />
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

