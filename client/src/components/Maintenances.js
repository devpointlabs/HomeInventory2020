import React from 'react';
import axios from 'axios';


export default class Maintenances extends React.Component {
    state = {
        maintenances: []
    };

    componentDidMount() {
        const { homeId, } = this.props
        axios.get(`/api/homes/${homeId}/maintenances`).then((res) => {
            console.log(res)
            this.setState({ maintenances: res.data });
        }).catch((err) => {
            console.log(err)
        })

    }

    renderMaintenances = () => {
        const {  maintenances } = this.state
        return  maintenances.map( maintenance => (
            <div key={ maintenance.id }>
                <h1> Maintenance </h1>
                <p>{ maintenance.due_date }</p>
                <p>{ maintenance.task }</p>
            </div>
        ))
    }

    render() {

        return (
            <>
                {this.renderMaintenances()}
            </>

        )
    }
}

