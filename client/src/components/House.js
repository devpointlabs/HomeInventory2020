import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import Assessments from './Assessments';
import Maintenances from './Maintenances';

export default class House extends React.Component {
    state = {
        houses: []
    };
    componentDidMount() {
        axios.get('/api/homes').then((res) => {
            console.log(res)
            this.setState({ houses: res.data });
            console.log( this.state.houses )
        })
            .catch((err) => {
                console.log(err)
            })
    }

    renderHouses = () => {
        const { houses } = this.state
        return houses.map(home => (
            <div key={home.id}>
                <p>{home.address}</p>
                <p>{home.zip_code}</p>
                <p>{home.square_footage}</p>
                <p>{home.lot_size}</p>
                <p>{home.purchase_date}</p>
                <p>{home.purchase_price}</p>
            </div>
        ))
    }
    renderAssessments = () => {
        const { houses } = this.state
        return houses.map(home => (
            <div key={`assessments-${home.id}`}>
             <Assessments homeId={home.id} />
            </div>
        ))

    }
    renderMaintenances = () => {
        const { houses } = this.state
        return houses.map(home => (
            <div key={`maintenances-${home.id}`}>
             <Maintenances homeId={home.id} />
            </div>
        ))

    }

    render() {
        return (
            <>
                {this.renderHouses()}
                {this.renderAssessments()}
                {this.renderMaintenances()}
            </>
        )
    }
}
