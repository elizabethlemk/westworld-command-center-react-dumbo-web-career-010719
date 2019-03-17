import '../stylesheets/HostInfo.css'
import React, { Component } from 'react'
import { Radio, Icon, Card, Grid, Image, Dropdown, Divider } from 'semantic-ui-react'
import Log from '../services/Log'


class HostInfo extends Component {
  state = {
    options: [{key: "high_plains", text: "High Plains", value: "high_plains"},
     {key: "lowlands", text: "Lowlands", value: "lowlands"},
     {key: "under_construction", text: "Under Construction", value: "under_construction"},
     {key: "pariah", text: "Pariah", value: "pariah"},
     {key: "python_pass", text: "Python Pass", value: "python_pass"},
     {key: "badlands", text: "Badlands", value: "badlands"}],
  }

  handleChange = (e, {value}) => {
    this.props.changeArea(this.props.host.id, value)
    this.props.addLog(Log.notify(`${this.props.host.firstName} moved to ${this.props.host.area.split(' ').map(function(word) {
    return word.replace(/[_\-]+/g, ' ').split(' ').map(function(word1) {return word1.replace(word1[0], word1[0].toUpperCase())}).join(' ')
  })}`))
  }

  toggle = () => {
    this.props.activateHost(this.props.host.id)
    this.props.addLog(Log.notify(`${this.props.host.firstName} has been ${this.props.host.active ? "activated" : "decommissioned"}`))
  }

  render(){
    return (
      <Grid>
        <Grid.Column width={6}>
          <Image
            src={this.props.host.imageUrl}
            floated='left'
            size='small'
            className="hostImg"
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card>
            <Card.Content>
              <Card.Header>
                {this.props.host.firstName} | { this.props.host.gender === "Male" ? <Icon name='man' /> : <Icon name='woman' />}
              </Card.Header>
              <Card.Meta>
                <Radio
                  onChange={this.toggle}
                  label={ this.props.host.active ? "Active" : "Decommissioned"}
                  checked={this.props.host.active ? true : false}
                  slider
                />
              </Card.Meta>

              <Divider />
              Current Area:
              <Dropdown
                onChange={this.handleChange}
                value={this.props.host.area}
                options={this.state.options}
                selection
              />
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    )
  }
}

export default HostInfo
