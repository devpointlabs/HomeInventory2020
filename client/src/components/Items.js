import React from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import axios from 'axios'
import ItemInfo from './ItemInfo'
import ItemPhoto from './ItemPhotos';
import Receipts from './Receipts';
import { Button } from 'antd'
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import LocationModal from '../components/modals/LocationModal'
import ItemModal from './modals/ItemModal'
import UploadModal from './modals/UploadModal'
import ItemFiles from './ItemFiles'
import ReceiptModal from './modals/ReceiptsModal';
import EditItemModal from './modals/EditItemModal'
import EditReceiptModal from './modals/EditReceiptModal'
import EditLocationModal from './modals/EditLocationModal'

class Items extends React.Component {
  state = { 
    locations: [],
    items: [], 
    locationId: 0, 
    itemId: null, 
    tab: 'info',
    receiptLoaded: false,
    receiptId: null
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
    this.setState({ tab: 'receipt'});
  }
  //Function is passed to receipt component to see if item has receipt. Result keeps or removes new receipt button.
  receiptLoaded = (bool, id) => {
    this.setState({receiptLoaded: bool, receiptId: id});
  }

  // Function is passed to new location form / modal to hot-reload on submit. 
  updateLocationList = (newLocation) => {
    const { locations } = this.state
    this.setState({locations: [...locations, newLocation.data]})
  }
  //Function passed to edit location modal to hot-reload list on submit of edit.
   updateLocation = async() => {
   const locationData =  await axios.get('/api/locations')
    this.setState({locations: locationData.data});
  }
  //Function is passed to new item form through modal to hot-reload added item. 
  updateItemList = (newItem) => {
    const { items } = this.state
    this.setState({items: [...items, newItem.data], itemId: newItem.data.id})
  }
  //function is passed to new item modal to be called in conjunction with closing animation:
  updateItemView = () => {
    this.setState({tab: 'info'});
  }

  //Toggles item number for info display:
  toggleItemId = (e) => {
    this.setState({ ...this.state, itemId: e });
  }

  // Toggles the location id for calling up item list. 
  toggleItems = (targetId) => {
    this.setState({ ...this.state, locationId: targetId, itemId: null});
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
      case 'receipt':
        return (
          <Receipts ref='receipt' itemId={this.state.itemId} receipt={this.state.receipt} update={this.receiptLoaded}/>
        )
      case 'files':
        return (
          <ItemFiles ref='file' itemId={this.state.itemId}/>
        )
      case 'newLocation':
        return (
          <LocationModal update={this.updateLocationList} tab={this.toggleTab}/>
        )
      case 'editLocation':
        return (
          <EditLocationModal locationId={this.state.locationId} tab={this.toggleTab} update={this.updateLocation}/>
        )
      case 'newItem':
        return (
          <ItemModal locationId={this.state.locationId} update={this.updateItemList} tab={this.updateItemView}/>
        )
      case 'editItem':
        return (
          <EditItemModal itemId={this.state.itemId} tab={this.updateItemView}/>
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
          <ReceiptModal itemId={this.state.itemId} update={this.updateReceipts} />
        )
      case 'editReceipt':
        return (
          <EditReceiptModal itemId={this.state.itemId} tab={this.updateReceipts} receiptId={this.state.receiptId} />
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
    const { tab, receiptLoaded } = this.state

    switch (tab) {
      case 'info':
        return (
          <>
          <Button shape="circle" onClick={() => this.toggleTab('editItem')}>
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
      case 'receipt':
        return (
          <>
          {receiptLoaded ? 
          <>
          <Button shape="circle" onClick={() => this.toggleTab('editReceipt')}>
            <EditOutlined />
          </Button>
          <Button shape="circle" onClick={() => this.deleteReceipt()}>
            <DeleteOutlined />
          </Button>
          </>
         : 
          <Button shape="circle" onClick={() => this.toggleTab('newReceipt')} >
            <PlusOutlined />
          </Button>
          }
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
  //calls delete function in Receipt.js
  deleteReceipt = () => {
    this.refs.receipt.deleteReceipt()
  }

// delete item when delete button pressed
  deleteItem = () => {
    const { items, itemId } = this.state
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
              <StyledA onClick={() => this.toggleTab('receipt')} 
              style={tab === 'receipt' && itemId !== null ? activeTab : {}}>
                Receipt
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
              {this.state.locationId !== 0 ?  
              <>
              <Button type="primary" shape="circle" onClick={() => this.deleteLocation()}>
                <DeleteOutlined />
              </Button>
              <Button type="primary" shape="circle" onClick={() => this.toggleTab('editLocation')}>
                <EditOutlined />
              </Button>
              </>
              : null}
            </div>
          </Col>
          <Col span={5}>
            <div style={{ ...divFoot }}>
              {this.state.locationId !== 0  ?  
              <>
              <Button shape="circle" onClick={() => this.toggleTab('newItem')}>
                <PlusOutlined />
              </Button> 
              {this.state.itemId !== null ?
                <>
                <Button shape="circle" onClick={() => this.deleteItem()}>
                  <DeleteOutlined />
                </Button>
                </>
                : null} 
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
  backgroundColor: '#D9D9D9', 
  boxShadow: '0px 2px 5px #888888', 
  paddingTop: '12px',
  transition: 'all 0.2s ease-in-out',
}
const passiveDiv = {
  height: '50px', 
  marginLeft: '14px', 
  paddingTop: '12px' ,
  transition: 'all 0.2s ease-in-out',
}
const activeA = {
  color:'#1890ff', 
  marginTop: '16px', 
  paddingLeft: '6px',
  transition: 'all 0.2s ease-in-out'
}
const activeTab = {
  color:'#1890ff', 
  textDecoration: 'underline',
  transition: 'all 0.2s ease-in-out'
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
