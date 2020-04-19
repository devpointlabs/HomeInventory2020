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
    reload = () => {
        const { homeId, } = this.props
        axios.get(`/api/homes/${homeId}/maintenances`).then((res) => {
            console.log(res)
            this.setState({ maintenances: res.data });
        }).catch((err) => {
            console.log(err)
        })
    }

    componentDidUpdate() {
        const { maintenanceId } = this.state
        this.props.getId(maintenanceId)
    }

    renderMaintenances = () => {
        const { maintenances, maintenanceId } = this.state
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
