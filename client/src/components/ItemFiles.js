import React from 'react'
import axios from 'axios'
import { List } from 'antd'


class ItemFiles extends React.Component {
  state = {
    files: [],
    fileId: null
  }

 async componentDidMount() {
  const { itemId } = this.props
  const fileData = await axios.get(`/api/items/${itemId}/documents`)
    this.setState({ files: fileData.data })
  }

  setId = (id) => {
    this.setState({fileId: id});
  }
  
  deleteFile = (id) => {
    const { itemId } = this.props
    const { fileId, files } = this.state
    axios.delete(`api/items/${itemId}/documents/${fileId}`)
    .then(res => {
      console.log(res)
      const filteredFiles = files.filter(f => f.id !== fileId)
      this.setState({
        fileId: null, 
        files: filteredFiles
      });
    }).catch(err => {
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

  render() {
    return (
      <>
        {this.renderFiles()}
      </>
    )
  }
}
export default ItemFiles

//styling for selected file in files tab
const passiveFileDiv = {
  margin: '12px',
  cursor: 'pointer'
}
const activeFileDiv = {
  margin: '12px',
  cursor: 'pointer',
  backgroundColor: '#f0f0f0'
}