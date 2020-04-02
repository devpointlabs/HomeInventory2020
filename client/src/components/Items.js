import React from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import RenderItems from './RenderItems'
import axios from 'axios'

class Items extends React.Component {
  state = { locations: [], id: 0};

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
      <StyledA2  onClick={() => this.toggleItems(location.id)}>{location.name}</StyledA2>
      <br/>
      </div>
    ))
  }

// Toggles the location id for calling up item list. 
  toggleItems = (targetId) => {
    this.setState({...this.state, id: targetId});
  }
// Component did update re-renders items when toggler is hit. 
  componentDidUpdate(){
    const { id } = this.state
    console.log(id)
  }
 render(){
   const { id } = this.state

   return(
    <>
    <Row >
      <Col span={5}>
        <div style={{...divHead}}>
          <p>Locations Drop Down</p>
        </div>
      </Col>
      <Col span={5}>
        <div style={{...divHead}}>
          <p>Items</p>
        </div>
      </Col>
      <Col span={14}>
        <div style={{...divHead}}>
        <StyledA>Info</StyledA>
        <StyledA>Photos</StyledA>
        <StyledA>Receipts</StyledA>
        <StyledA>Files</StyledA>
        </div>
      </Col>
    </Row>
    <Row>
      <Col span={5} style={{display: 'flex', flexDirection: 'row'}}>
        <div style={{...divField}}>           
          {this.renderLocations()}
        </div>
      </Col>
      <Col span={5}>
        <div style={{...divField}}>        
          <RenderItems locationId={id}/>
        </div>
      </Col>
      <Col span={14}>
        <div style={{...divField}}>           
          Info Display
        </div>
      </Col>  
    </Row>
    <Row>
      <Col span={5}>
      <div style={{...divFoot}}> 
        Bottom Nav
      </div>
      </Col>
      <Col span={5}>
      <div style={{...divFoot}}> 
        Bottom Nav
      </div>
      </Col>
      <Col span={14}>
      <div style={{...divFoot}}> 
        No Items
      </div>
      </Col>     
    </Row>
  </>
    
)}

} 




const divHead = {
display: 'flex',
alignItems: 'center',
justifyContent: 'space-around',
height: 'auto',
width: 'auto',
fontSize: '19px',
color: '#272829',
border: '1px solid grey',
padding: '12px',
fontWeight: '400'
}
const divField = {
display: 'flex !important',
flexDirection: 'row !important',
height: '30em',
width: '100%',
fontSize: '18px',
color: '#272829',
border: '1px solid grey',
padding: '14px',
fontWeight: '300'
}
const divFoot = {
display: 'flex',
alignItems: 'center',
justifyContent: 'space-around',
height: 'auto',
width: 'auto',
fontSize: '19px',
color: '#272829',
border: '1px solid grey',
padding: '12px',
fontWeight: '400'
}
const StyledA = styled.a`
color: #272829;
text-decoration: none;
`
const StyledA2 = styled.a`
color: #272829;
text-decoration: none;
`

export default Items;
