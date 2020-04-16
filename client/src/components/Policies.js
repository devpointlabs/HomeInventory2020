import React from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import axios from 'axios'
import Uploader from './uploaders/FileUploader';
import { Button, List } from 'antd'
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import LocationForm from '../components/forms/LocationForm'
import PolicyForm from '../components/forms/PolicyForm'


class Policies extends React.Component {
  state = { locations: [], locationId: 0, tab: 'info'};
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
  //Function is passed to new location form / modal to hot-reload on submit. 
  updateLocationList = (newLocation) => {
    const { locations } = this.state
    this.setState({locations: [...locations, newLocation.data]})
  }
// Toggles Info display for info / photos / etc. 
  toggleTab = (t) => {
    this.setState({tab: t})
  }
  // Render information panel based on function above / active tab. 
  renderLocationInfo = () => {
    const { tab } = this.state
    switch (tab) {
      case 'files':
        return (
          <Uploader itemId={this.state.itemId} update={this.updateFiles}/>
        )
      case 'newLocation':
        return (
          <LocationForm update={this.updateLocationList}/>
        )
      default:
        return (
          <>
          </>
        )
    }
  }

  renderTabButtons = () => {
    const { tab } = this.state

    switch (tab) {
      case 'info':
        return (
          <>
          <Button shape="circle">
            <EditOutlined />
          </Button>
          <Button shape="circle" onClick={() => this.deleteItem()}>
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
      case 'newFile':
        return (
          <>
          <Button shape="circle" onClick={() => this.toggleTab('files')}>
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

  renderFiles = () => {
    const { files, fileId } = this.state
    return files.map(file => (
      <div style={fileId === file.id ? activeFileDiv : passiveFileDiv} key={file.id} onClick={() => this.setId(file.id)}>
      <List
        size="large"
        bordered
        >
        <List.Item>
          <a href={file.file} width='auto' height='200px'>{file.name} </a>
        </List.Item>
      </List>
      </div>
    ))
  }
  // Function that toggles active file ID:
  setId = (id) => {
    this.setState({
      fileId: id
    });
  }

  updateFiles = () => {
    this.setState({filesLoaded: false});
  }

  deleteFile = (id) => {
    const { itemId, fileId, files } = this.state
    axios.delete(`api/items/${itemId}/documents/${fileId}`)
    .then(res => {
      console.log(res)
      const filteredFiles = files.filter(f => f.id !== fileId)
      this.setState({
        fileId: null, 
        tab: 'files',
        files: filteredFiles
      });
    }).catch(err => {
      console.log(err)
    })
  }
  
  render() {
    const { tab, locationId } = this.state
    return (
      <>
      <PolicyForm></PolicyForm>
        <Row >
          <Col span={5}>
            <div style={{ ...divHead }}>
              <p>Policies</p>
            </div>
          </Col>
          <Col span={14}>
            <div style={{ ...divHead }}>
              <StyledA 
              onClick={() => this.toggleTab('info')} 
              style={tab === 'info' && locationId !== null ? activeTab : {}}>
                Info
              </StyledA>
              <StyledA 
              onClick={() => this.toggleTab('files')} 
              style={tab === 'files' && locationId !== null ? activeTab : {}}>
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
              <Button shape="circle" onClick={() => this.toggleTab('newItem')}>
                <PlusOutlined />
              </Button>
              : null}
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
// styling for selected menu options
const activeDiv = {height: '50px', backgroundColor: '#f0f0f0', boxShadow: '0px 2px 5px #888888', paddingTop: '12px'}
const passiveDiv = {height: '50px', marginLeft: '14px', paddingTop: '12px' }
const activeA = {color:'#1890ff', marginTop: '16px', paddingLeft: '6px'}
const activeTab = {color:'#1890ff', textDecoration: 'underline'}
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
const passiveFileDiv = {
  margin: '12px',
  cursor: 'pointer'
}
const activeFileDiv = {
  margin: '12px',
  cursor: 'pointer',
  backgroundColor: '#f0f0f0'
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
export default Policies;