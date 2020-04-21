import React from 'react'
import axios from 'axios'
import { List } from 'antd'


class PolicyFiles extends React.Component {
  state = {
    files: [],
    fileId: null,
    policyId: null
  }

 async componentDidMount() {
  const { homeId, policyId } = this.props
  if (policyId !== null) {
  const fileData = await axios.get(`/api/homes/${homeId}/policies`)
    this.setState({ files: fileData.data, policyId })
  }
}

async componentDidUpdate() {
  const { homeId, policyId } = this.props
  if (policyId !== null && policyId !== this.state.policyId) {
    const fileData = await axios.get(`/api/homes/${homeId}/policies`)
    this.setState({ files: fileData.data, policyId })
  }
}

  setId = (id) => {
    this.setState({fileId: id});
  }
  
  deleteFile = (id) => {
    const { homeId } = this.props
    const { fileId, files } = this.state
    axios.delete(`api/homes/${homeId}/policies/${fileId}`)
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

  render() {
    const { files, fileId, policyId } = this.state

    if( policyId === null){
      return(
        <>
        </>
      )
    }
    if (files.length > 0) {
    return files.map(file => (
      <div style={fileId === file.id ? activeFileDiv : passiveFileDiv} key={file.id} onClick={() => this.setId(file.id)}>
        <List
          size="large"
          bordered
        >
          <List.Item>
            <a href={file.policy_file} width='auto' height='200px'>{file.name} </a>
          </List.Item>
        </List>
      </div>
    ))
    }
    return (
      <div style={{margin: '10px'}}>
        <p>No Files Found</p>
      </div>
    )
  }
}

export default PolicyFiles

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