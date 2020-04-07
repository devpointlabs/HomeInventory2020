import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';

export default class House extends React.Component {
    state = {
        houses: []
    };
    componentDidMount() {
        axios.get('/api/homes').then((res) => {
            console.log(res)
            this.setState({ houses: res.data });
        })
            .catch((err) => {
                console.log(err)
            })
    }

    renderHouses = () => {
        const { houses } = this.state
        return houses.map(home => (
            <div key={home.id}>
                <h1>{home.zip_code}</h1>
            </div>
        ))
    }

    render() {
        return (
            <>
                {this.renderHouses()}
            </>
        )
    }
}
