import React from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import axios from 'axios'
import ItemInfo from './ItemInfo'
import ItemPhoto from './ItemPhotos';
import Receipts from './Receipts';
import { Button } from 'antd'
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import LocationForm from '../components/forms/LocationForm'
import ItemForm from './forms/ItemForm'

class Items extends React.Component {
  state = { locations: [], items: [], receipts: {}, locationId: null, itemId: null, tab: 'info'};

  async componentDidMount() {
    let data = await axios.get('/api/locations')
    this.setState({ locations: data.data });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.locationId !== null && prevState.locationId !== this.state.locationId){
      let itemList = await axios.get(`/api/locations/${this.state.locationId}/items`)
      this.setState({items: itemList.data});
    }
  }

  renderLocations = () => {
    const { locations } = this.state
    return locations.map(location => (
      <div key={location.id}>
        <StyledA2 onClick={() => this.toggleItems(location.id)}>{location.name}</StyledA2>
        <br />
      </div>
    ))
  }

  renderItems = () => {
    const { items } = this.state
    return items.map(item => (
      <div key={item.id}>
        <StyledA2 onClick={() => this.toggleItemId(item.id)}>{item.name}</StyledA2>
      </div>
    ))
  }


  //Function is passed to new location form / modal to hot-reload on submit. 
  updateLocationList = (newLocation) => {
    const { locations } = this.state
    this.setState({locations: [...locations, newLocation]})
    console.log(this.state.locations)
  }
  //Function is passed to new item form to hot-reload added item. 
  updateItemList = (newItem) => {
    this.setState({});
  }

// Toggles Info display for info / photos / etc. 
  toggleTab = (t) => {
    this.setState({tab: t})
  }
  // Render information panel based on function above / active tab. 
  renderItemInfo = () => {
    const { tab } = this.state

    switch (tab) {
      case 'info':
        return (
          <ItemInfo itemId={this.state.itemId} locationId={this.state.locationId}/>
        )
      case 'photos':
        return(
          <ItemPhoto itemId={this.state.itemId} locationId={this.state.locationId} />
        )
      case 'receipts':
        return (
          <Receipts itemId={this.state.itemId} receiptId={this.state.receiptId}/>
        )
      case 'files':
        return (
          <p>FILES</p>
        )
      case 'newLocation':
        return (
          <LocationForm update={this.updateLocationList}/>
        )
      case 'newItem':
        return (
          <ItemForm locationId={this.state.locationId} update={this.updateItemList}/>
        )
      default:
        return (
          <>
          </>
        )
    }
  }
  
//Toggles item number for info display:
  toggleItemId = (e) => {
    this.setState({ ...this.state, itemId: e });
  }

  // Toggles the location id for calling up item list. 
  toggleItems = (targetId) => {
    this.setState({ ...this.state, locationId: targetId });
  }
  // delete item when delete button pressed
  deleteItem = () => {
    const { id, itemId } = this.state
    console.log(`delete item: ${this.state.itemId}`)
    console.log(`location id: ${this.state.id}`)
    axios.delete(`/api/locations/${id}/items/${itemId}`)
      .then(res => {
        console.log(res)
        this.setState({
          id: 0, itemId: null, tab: 'blank'
        });
      })
      .catch(err => {
        console.log(err)
      })
  }
// delete item when delete button pressed
  deleteItem = () => {
    const { id, itemId } = this.state
    console.log(`delete item: ${this.state.itemId}`)
    console.log(`location id: ${this.state.id}`)
    axios.delete(`/api/locations/${id}/items/${itemId}`)
    .then(res => {
      console.log(res)
      this.setState({
        id: 0, itemId: null, tab: 'blank'
      });
    })
    .catch(err => {
      console.log(err)
    })
  }
// delete item when delete button pressed
  deleteItem = () => {
    const { id, itemId } = this.state
    console.log(`delete item: ${this.state.itemId}`)
    console.log(`location id: ${this.state.id}`)
    axios.delete(`/api/locations/${id}/items/${itemId}`)
    .then(res => {
      console.log(res)
      this.setState({
        id: 0, itemId: null, tab: 'blank'
      });
    })
    .catch(err => {
      console.log(err)
    })
  }


  render() {
    const { tab, itemId } = this.state

    return (
      <>
        <Row >
          <Col span={5}>
            <div style={{ ...divHead }}>
              <p>Locations Drop Down</p>
            </div>
          </Col>
          <Col span={5}>
            <div style={{ ...divHead }}>
              <p>Items</p>
            </div>
          </Col>
          <Col span={14}>
            <div style={{ ...divHead }}>
              <StyledA onClick={() => this.toggleTab('info')}>Info</StyledA>
              <StyledA onClick={() => this.toggleTab('photos')}>Photos</StyledA>
              <StyledA onClick={() => this.toggleTab('receipts')}>Receipts</StyledA>
              <StyledA onClick={() => this.toggleTab('files')}>Files</StyledA>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={5} style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ ...divField }}>
              {this.renderLocations()}
            </div>
          </Col>
          <Col span={5}>
            <div style={{ ...divField }}>
              {this.renderItems()}
            </div>
          </Col>
          <Col span={14}>
            <div style={{ ...divField }}>
              {this.renderItemInfo(tab, itemId)}
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={5}>
            <div style={{ ...divFoot }}>
              <Button type="primary" shape="circle" onClick={() => this.toggleTab('newLocation')}>
                <PlusOutlined />
              </Button>
            </div>
          </Col>
          <Col span={5}>
            <div style={{ ...divFoot }}>
              <Button type="primary" shape="circle" onClick={() => this.toggleTab('newItem')}>
                <PlusOutlined />
              </Button>
            </div>
          </Col>
          <Col span={14}>
            <div style={{ ...divFoot }}>
              {this.state.itemId !== null ?
                <>
                  <Button shape="circle">
                    <EditOutlined />
                  </Button>
                  <Button shape="circle" onClick={() => this.deleteItem()}>
                    <DeleteOutlined />
                  </Button>
                </>
                : null}
            </div>
          </Col>
        </Row>
      </>
    )
  }}



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
minHeight: '30em',
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
minHeight: '58px',
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


//this.setState{photos: [...photos, newPhoto]} = hot reload