import React from 'react';
import axios from 'axios';
import MaintenanceForm from './MaintenanceForm';


export default class Maintenances extends React.Component {
    state = {
        maintenances: [],
        checkbox: false,
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

    deleteMaintenance = () => {
        const { homeId, } = this.props
        const {  } = this.state
        axios.delete(`/api/homes/${homeId}/maintenances/:id`)
        .then(res => {
        })
        .catch(err => {
          console.log(err)
        })
      }
    

    handleChange = () => {
        this.setState({checkbox: !this.state.checkbox})
        console.log(this.state.checkbox)
    }

    renderMaintenances = () => {
        const { maintenances } = this.state
        if (maintenances.length !== 0) {
            return maintenances.map(maintenance => (
                <div key={maintenance.id}>
                    <tr>
                        <input type="checkbox" name="name1" onChange={this.handleChange}/>
                        <td>{maintenance.due_date}</td>
                        <td>{maintenance.task}</td>
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
                {this.renderMaintenances()}
            </>

        )
    }
}



