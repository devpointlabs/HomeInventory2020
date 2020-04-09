import React from 'react';
import axios from 'axios';
import CustomTableM from './CustomTableM';


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
            <CustomTableM info={maintenance} />
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

