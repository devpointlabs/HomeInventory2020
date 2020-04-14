import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


export default class Maintenances extends React.Component {
    state = {
        maintenances: [], maintenanceId: 0,
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
        const { maintenanceId } = this.state
        axios.delete(`/api/homes/${homeId}/maintenances/${maintenanceId}`)
            .then(res => {
                console.log('deleted')
            })
            .catch(err => {
                console.log(err)
            })
    }


    handleChange = (e) => {
        this.setState({ checkbox: !this.state.checkbox })
        console.log(this.state.checkbox)
        console.log(e)
    }

    renderMaintenances = () => {
        const { maintenances , maintenanceId } = this.state
        console.log(this.state.maintenanceId)
        if (maintenances.length !== 0) {
            return maintenances.map(maintenance => (
                <StyledTableRow key={maintenance.id} onClick={() => this.setState({ maintenanceId: maintenance.id })} style={maintenance.id === maintenanceId ? activeDiv : passiveDiv}>
                    <tr>
                        <StyledTableData >{maintenance.due_date}</StyledTableData>
                        <StyledTableData>{maintenance.task}</StyledTableData>
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
                {this.renderMaintenances()}
                <div onClick={this.deleteMaintenance}>delete</div>
                <Link to={{pathname: '/edit/maintenance', id: this.state.maintenanceId}}>
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
