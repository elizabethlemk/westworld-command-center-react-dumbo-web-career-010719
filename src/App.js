import React, { Component } from 'react';
import './stylesheets/App.css'
import { Segment } from 'semantic-ui-react';
import WestworldMap from './components/WestworldMap'
import Headquarters from './components/Headquarters'
import Log from './services/Log'



class App extends Component {
  state={
    areas: [],
    hosts: [],
    selectedHostId: null,
    log: []
  }

  componentDidMount(){
    fetch('http://localhost:4000/hosts')
    .then(resp => resp.json())
    .then(json => this.setState({...this.state, hosts: json}))
    fetch('http://localhost:4000/areas')
    .then(resp => resp.json())
    .then(json => this.setState({...this.state, areas: json}))
    console.log("Fetched hosts and areas");
  }

  selectHost = (hostId) => {
    this.setState({...this.state, selectedHostId: hostId}, console.log("the selected host is: " + this.state.hosts.find(host => host.id === hostId).firstName))
  }

  activateHost = (hostId) => {
    this.setState({...this.state.hosts.forEach(host=> {
        if (host.id === hostId) {
          host.active = !host.active
        }
      })
    })
  }

  addLog = (msg) => {
    this.setState({...this.state.log.unshift(msg)})
  }

  changeArea = (hostId, value) => {
    let formattedValue = value.split(' ').map(function(word) {
    return word.replace(/[_\-]+/g, ' ').split(' ').map(function(word1) {return word1.replace(word1[0], word1[0].toUpperCase())}).join(' ')} )

    if (this.state.hosts.filter(host => host.area === value).length < this.state.areas.find(area => area.name === value).limit) {
      this.setState({...this.state.hosts.forEach(host => {
          if (host.id === hostId) { host.area = value }
        })}
      )
    } else {
      this.addLog(Log.error(`Too many hosts. Cannot add ${this.state.hosts.find(host => host.id === hostId).name} to ${formattedValue}`))
    }
  }

  activateAll = () => {
    this.setState({...this.state.hosts.forEach(host=> host.active = true)
    }, this.addLog(Log.warn("All hosts are activated"))
    )}

  decommissionAll = () => {
    this.setState({...this.state.hosts.forEach(host=> host.active = false)
    }, this.addLog(Log.warn("All hosts are decommissioned"))
  )}


  render(){

    return (
      <Segment id='app'>
        <WestworldMap areas={this.state.areas}
        selectHost={this.selectHost}
        selectedHostId={this.state.selectedHostId}
        hosts={this.state.hosts}/>

        <Headquarters hosts={this.state.hosts}
        selectHost={this.selectHost}
        selectedHostId={this.state.selectedHostId}
        activateHost={this.activateHost}
        changeArea={this.changeArea}
        activateAll={this.activateAll}
        decommissionAll={this.decommissionAll}
        addLog={this.addLog}
        log={this.state.log}/>
      </Segment>
    )
  }
}

export default App;
