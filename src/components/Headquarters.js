import React, { Component } from 'react';
import '../stylesheets/Headquarters.css';
import { Grid } from 'semantic-ui-react';
import Details from './Details'
import ColdStorage from './ColdStorage'
import LogPanel from './LogPanel'

class Headquarters extends Component {
  state={
    activated: false
  }

  selectedHost = () => {
    return this.props.hosts.find(host => host.id === this.props.selectedHostId)
  }

  toggleActivated = () => {
    this.setState({...this.state, activated: !this.state.activated})
  }

  render(){
    return(
      <Grid celled='internally'>
        <Grid.Column width={8}>

          <ColdStorage selectHost={this.props.selectHost}
          hosts={this.props.hosts}
          selectedHostId={this.props.selectedHostId}/>

        </Grid.Column>
        <Grid.Column width={5}>

          <Details selectedHost={this.selectedHost()}
           activateHost={this.props.activateHost}
           changeArea={this.props.changeArea}
           activateAll={this.props.activateAll}
           decommissionAll={this.props.decommissionAll}
           addLog={this.props.addLog}/>

        </Grid.Column>
        <Grid.Column width={3}>

          <LogPanel
          activated={this.state.activated}
          toggleActivated={this.toggleActivated}
          activateAll={this.props.activateAll}
          decommissionAll={this.props.decommissionAll}
          addLog={this.props.addLogs}
          log={this.props.log}/>

        </Grid.Column>
      </Grid>
    )
  }
}

export default Headquarters;
