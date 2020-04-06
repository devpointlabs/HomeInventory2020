import React from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import RenderItems from './RenderItems'
import axios from 'axios'
import ItemInfo from './ItemInfo'
import Receipts from './Receipts';

class Items extends React.Component {
  state = { locations: [], receipts: {}, id: 0, tab: 'info', itemId: null};

  componentDidMount() {
    axios.get('/api/locations').then((res) => {
      this.setState({ locations: res.data });
    })

    .catch((err) => {
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
// Toggles Info display for info / photos / etc. 
  toggleTab = (t) => {
    this.setState({tab: t})
  }
// Render information panel based on function above / active tab. 
  renderItemInfo = () => {
    const { tab } = this.state
    if (tab == 'info') {
      return (
        <ItemInfo itemId={this.state.itemId} locationId={this.state.id}/>
      )
    } else if (tab == 'photos' ) {
      return(
        <p>PHOTOS</p>
        )
      } else if ( tab == 'receipts') {
        return (
          <Receipts itemId={this.state.itemId} receiptId={this.state.receiptId}/>
      )
    }
    return (
      <p>FILES</p>
    )
    }
  
//Toggles item number for info display:
  toggleItemId = (e) => {
    this.setState({...this.state, itemId: e});
  }

// Toggles the location id for calling up item list. 
  toggleItems = (targetId) => {
    this.setState({...this.state, id: targetId});
  }

 render(){
   const { id, tab, itemId } = this.state

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
        <StyledA onClick={() => this.toggleTab('info')}>Info</StyledA>
        <StyledA onClick={() => this.toggleTab('photos')}>Photos</StyledA>
        <StyledA onClick={() => this.toggleTab('receipts')}>Receipts</StyledA>
        <StyledA onClick={() => this.toggleTab('files')}>Files</StyledA>
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
          <RenderItems locationId={id} toggleItemId={this.toggleItemId}/>
        </div>
      </Col>
      <Col span={14}>
        <div style={{...divField}}>           
          {this.renderItemInfo(tab, itemId)}
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
