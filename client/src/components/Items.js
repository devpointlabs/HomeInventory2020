import React from 'react';
import { PageHeader, } from 'antd';
import axios from 'axios';
import RenderItems from './RenderItems';

export default class Items extends React.Component {
  state = { locations: [], };

  componentDidMount() {
    axios.get('/api/locations').then((res) => {
      this.setState({ locations: res.data });
    }).catch((err) => {
      console.log(err)
    })
  }
  renderLocations = () => {
    const { locations } = this.state
    return locations.map(location => (
      <div key={location.id}>
        <h2 >{location.name}</h2>
        <RenderItems locationId={location.id}/>
      </div>
    ))
  }

  render() {
    return (
      <>
        <h1>Locations Drop Down</h1>
        {this.renderLocations()}
      </>

    )
  }
}
