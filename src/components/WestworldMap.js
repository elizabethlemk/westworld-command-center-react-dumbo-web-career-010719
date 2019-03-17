import React from 'react';
import { Segment } from 'semantic-ui-react';
import Area from './Area'


const WestworldMap = (props) => {

  const renderHosts=(area) => {
    return props.hosts.filter(host=> host.area === area)
  }

  return (
    <Segment id="map" >
      {props.areas.map(area => <Area key={area.id}
        area={area}
        hosts={renderHosts(area.name)}
        selectHost={props.selectHost} />)}
    </Segment>
  )
}

export default WestworldMap
