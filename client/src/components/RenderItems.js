import React from 'react';
import axios from 'axios';

export default class RenderItems extends React.Component {
  state = { items: [], };

  componentDidMount() {
      const { locationId } = this.props
    axios.get(`/api/locations/${locationId}/items`).then((res) => {
      this.setState({ items: res.data });
    }).catch((err) => {
      console.log(err)
    })
  }
  renderItems = () => {
    const { items } = this.state
    return items.map(item => (
      <div key={item.id}>
        <h3 >- {item.name}</h3>
      </div>
    ))
  }

  render() {
    return (
      <>
        {this.renderItems()}
      </>

    )
  }
}