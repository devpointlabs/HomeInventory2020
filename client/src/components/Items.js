import React from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import axios from 'axios'
import ItemInfo from './ItemInfo'
import ItemPhoto from './ItemPhotos';
import Receipts from './Receipts';
import { Button, List } from 'antd'
import { PlusOutlined, DeleteOutlined, EditOutlined, CheckOutlined } from '@ant-design/icons'
import LocationForm from '../components/forms/LocationForm'
import ItemForm from './forms/ItemForm'
import UploadModal from './modals/UploadModal'
import ItemFiles from './ItemFiles'
import ReceiptModal from './modals/ReceiptsModal';

class Items extends React.Component {
  state = { 
    locations: [],
    items: [], 
    locationId: 0, 
    itemId: null, 
    tab: 'info'
  };

  async componentDidMount() {
    let locationData = await axios.get('/api/locations')
    console.log(locationData)
    this.setState({ locations: locationData.data });
    let itemData = await axios.get('/api/items')
    console.log(itemData)
    this.setState({ items: itemData.data });
  }

  renderLocations = () => {
    const { locations, locationId } = this.state
    return locations.map(location => (
      <div key={location.id} style={location.id === locationId ? activeDiv : passiveDiv}>
        <StyledA2 
        onClick={() => this.toggleItems(location.id)}
        style={location.id === locationId ? activeA : {}}
        >
          {location.name}
        </StyledA2>
        <br />
      </div>
    ))
  }

  renderItems = () => {
    const { items, itemId, locationId } = this.state
    const filteredItems = items.filter(i => i.location_id === locationId)
    return filteredItems.map(item => (
      <div key={item.id} style={item.id === itemId ? activeDiv : passiveDiv}>
        <StyledA2 onClick={() => this.toggleItemId(item.id)}
         style={item.id === itemId ? activeA : {}}
         >
           {item.name}
        </StyledA2>
      </div>
    ))
  }

  // Function that toggles active file ID:
  setId = (id) => {
    this.setState({
      fileId: id
    });
  }
  // Function is passed to Uploader component to trigger reload of files when adding new:
  updateFiles = () => {
    this.setState({filesLoaded: false, tab: 'files'});
  }
  updatePhotos = () => {
    this.setState({ tab: 'photos'});
  }
  updateReceipts = () => {
    this.setState({ tab: 'receipts'});
  }

  // Function is passed to new location form / modal to hot-reload on submit. 
  updateLocationList = (newLocation) => {
    const { locations } = this.state
    this.setState({locations: [...locations, newLocation.data]})
  }
  //Function is passed to new item form to hot-reload added item. 
  updateItemList = (newItem) => {
    const { items } = this.state
    this.setState({items: [...items, newItem.data], tab: 'info', itemId: newItem.data.id})
  }
    
  //Toggles item number for info display:
  toggleItemId = (e) => {
    this.setState({ ...this.state, itemId: e , tab: 'info'});
  }

  // Toggles the location id for calling up item list. 
  toggleItems = (targetId) => {
    this.setState({ ...this.state, locationId: targetId, itemId: null, tab: 'blank'});
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
          <ItemPhoto ref='photo' itemId={this.state.itemId} locationId={this.state.locationId} />
        )
      case 'receipts':
        return (
          <Receipts itemId={this.state.itemId} receipt={this.state.receipt}/>
        )
      case 'files':
        return (
          <ItemFiles ref='file' itemId={this.state.itemId}/>
        )
      case 'newLocation':
        return (
          <LocationForm update={this.updateLocationList}/>
        )
      case 'newItem':
        return (
          <ItemForm locationId={this.state.locationId} update={this.updateItemList}/>
        )
      case 'newFile':
        return (
          <UploadModal itemId={this.state.itemId} title={'Upload File'} type={'file'} update={this.updateFiles}/>
        )
      case 'newPhoto':
        return (
          <UploadModal itemId={this.state.itemId} title={'Upload Photo'} type={'photo'} update={this.updatePhotos}/>
        )
      case 'newReceipt':
        return (
          <ReceiptModal itemId={this.state.itemId} update={this.updateReceipts}/>
        )
      default:
        return (
          <>
          </>
        )
    }
  }
  // Render correct set and functions for buttons in tab area lower nav:
  renderTabButtons = () => {
    const { tab } = this.state

    switch (tab) {
      case 'info':
        return (
          <>
          <Button shape="circle">
            <EditOutlined />
          </Button>
     
        </>
        )
      case 'photos':
        return(
          <>
          <Button shape="circle" onClick={() => this.toggleTab('newPhoto')}>
            <PlusOutlined />
          </Button>
           <Button shape="circle" onClick={() => this.deletePhoto()}>
            <DeleteOutlined />
          </Button>
          </>
        )
      case 'receipts':
        return (
          <>
          <Button shape="circle" onClick={() => this.toggleTab('newReceipt')} >
            <PlusOutlined />
          </Button>
          <Button shape="circle">
            <EditOutlined />
          </Button>
          <Button shape="circle" >
            <DeleteOutlined />
          </Button>
          </>
        )
      case 'files':
        return (
          <>
          <Button shape="circle" onClick={() => this.toggleTab('newFile')}>
            <PlusOutlined />
          </Button>
          <Button shape="circle" onClick={() => this.deleteFile()}>
            <DeleteOutlined />
          </Button>
          </>
        )
      default:
        return (
          <>
          </>
        )
    }
  }
  //calls delete function in ItemPhoto.js
  deletePhoto = () => {
    this.refs.photo.deletePhoto()
  }

  //calls delete function in ItemFile.js
  deleteFile = () => {
    this.refs.file.deleteFile()
  }

// delete item when delete button pressed
  deleteItem = () => {
    const { items, locationId, itemId } = this.state
    axios.delete(`/api/items/${itemId}`)
    .then(res => {
      console.log(res)
      const filteredArr = items.filter( i => i.id !== itemId)
      this.setState({
        items: filteredArr, itemId: null, tab: 'blank'
      });
    })
    .catch(err => {
      console.log(err)
    })
  }
// delete location when delete button pressed
  deleteLocation = () => {
    const { locationId, locations } = this.state
    axios.delete(`/api/locations/${locationId}`)
    .then(res => {
      console.log(res)
      const filteredLocations = locations.filter( location => location.id !== locationId)
      this.setState({
        locations: filteredLocations, LocationId: 0, itemId: null, tab: 'blank'
      });
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    const { tab, itemId, locationId } = this.state

    return (
      <>
        <Row >
          <Col span={5}>
            <div style={{ ...divHead }}>
              <p>Locations</p>
            </div>
          </Col>
          <Col span={5}>
            <div style={{ ...divHead }}>
              <p>Items</p>
            </div>
          </Col>
          <Col span={14}>
            <div style={{ ...divHead }}>
              <StyledA 
              onClick={() => this.toggleTab('info')} 
              style={tab === 'info' && itemId !== null ? activeTab : {}}>
                Info
              </StyledA>
              <StyledA 
              onClick={() => this.toggleTab('photos')} 
              style={tab === 'photos' && itemId !== null ? activeTab : {}}>
                Photos
              </StyledA>
              <StyledA onClick={() => this.toggleTab('receipts')} 
              style={tab === 'receipts' && itemId !== null ? activeTab : {}}>
                Receipts
              </StyledA>
              <StyledA 
              onClick={() => this.toggleTab('files')} 
              style={tab === 'files' && itemId !== null ? activeTab : {}}>
                Files
              </StyledA>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={5} style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ ...divField }}>
              {this.renderLocations()}
              <div key={'nullLocation'} style={locationId === null ? activeDiv : passiveDiv}>
                <StyledA2
                onClick={() => this.toggleItems(null)}
                style={locationId === null ? activeA : {}}
                >
                Unspecified
                </StyledA2>
              </div>
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
              {this.state.locationId !== null ?  
              <>
              <Button type="primary" shape="circle" onClick={() => this.deleteLocation()}>
                <DeleteOutlined />
              </Button>
              <Button type="primary" shape="circle">
                <EditOutlined />
              </Button>
              </>
              : null}
            </div>
          </Col>
          <Col span={5}>
            <div style={{ ...divFoot }}>
              {this.state.locationId !== null ?  
              <>
              <Button shape="circle" onClick={() => this.toggleTab('newItem')}>
                <PlusOutlined />
              </Button>
              <Button shape="circle" onClick={() => this.deleteItem()}>
                <DeleteOutlined />
              </Button>
              </>
              : null}
            </div>
          </Col>
          <Col span={14}>
            <div style={{ ...divFoot }}>
              {this.state.itemId !== null ?
                <>
                {this.renderTabButtons()}
                </>
                : null}
            </div>
          </Col>
        </Row>
      </>
    )
  }}

// styling for selected menu options
const activeDiv = {
  height: '50px',
  backgroundColor: '#f0f0f0', 
  boxShadow: '0px 2px 5px #888888', 
  paddingTop: '12px'
}
const passiveDiv = {
  height: '50px', 
  marginLeft: '14px', 
  paddingTop: '12px' 
}
const activeA = {
  color:'#1890ff', 
  marginTop: '16px', 
  paddingLeft: '6px'
}
const activeTab = {
  color:'#1890ff', 
  textDecoration: 'underline'
}

// styling for layout of items page
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
fontWeight: '300',
overflow: 'scroll'
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
//styling for item and location name links
const StyledA = styled.a`
color: #272829;
text-decoration: none;
`
const StyledA2 = styled.a`
color: #272829;
text-decoration: none;
`

export default Items;
