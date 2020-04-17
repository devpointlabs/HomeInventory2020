import React from 'react';
import axios from 'axios';
import { Divider } from 'antd'
import styled from 'styled-components';

export default class RenderItem extends React.Component {
  state = {
    item: {},
    photo: {}
  };

  componentDidMount() {
    const { itemId } = this.props
    if (itemId !== null) {
      axios.get(`/api/items/${itemId}/photos`).then((res) => {
        console.log(res)
        this.setState({ photo: res.data[0]});
      })
      axios.get(`/api/items/${itemId}`).then((res) => {
        console.log(res)
        this.setState({ item: res.data });
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  componentDidUpdate() {
    const { itemId } = this.props
    if (itemId !== null && itemId !== this.state.item.id) {
      axios.get(`/api/items/${itemId}/photos`).then((res) => {
        console.log(res)
        this.setState({ photo: res.data[0]});
      })
      axios.get(`/api/items/${itemId}`).then((res) => {
        console.log(res)
        this.setState({ item: res.data });
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  render() {
    const { item, photo } = this.state
    if (this.state.item.id) {
      return (
        
          <div style={{width: '100%'}}>
            <h3>{item.name}</h3>
            <Divider />
            <div style={containerDiv}>
              <div style={{width: '55%'}}>
                <h5>Make: {item.make}</h5>
                <h5>Model: {item.model}</h5>
                <h5>Serial Number: {item.serial_num}</h5>
                <h5>Category: {item.category}</h5>
                <h5>Collection: {item.collection}</h5>
                <h5>Condition: {item.condition}</h5>
                <h5>{item.purchase_date}</h5>
                <h5>Quantity: {item.quantity}</h5>
                <h5>Stated Value: {item.value}</h5>
                <h5>Tags: {item.tags}</h5>
              </div>
          {photo ?  
          <div>
          <StyledImg key={photo.id}>
            <img src={photo.file} 
            width='auto' 
            height='200px' 
            />
          </StyledImg>
          </div> 
          :
          <div>
           <p>No Photo Found</p>
          </div>
           }
          </div>
        </div>
      )
    }
    return (
      <>
      </>
    )
  }
}

const containerDiv = {
   margin: '16px',
   display: 'flex',
   flexDirection: 'row'
}

const StyledImg = styled.div`
margin: 10px 10px;
margin-top: 16px;
cursor: pointer;
transition: all 0.3s ease-in-out;
`