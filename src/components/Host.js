import React from 'react';
import '../stylesheets/Host.css'
import { Card } from 'semantic-ui-react'

const Host = (props) => {


  return(
    <Card
      className="host selected"
      onClick={()=> props.selectHost(props.hostInfo.id)}
      image={props.hostInfo.imageUrl}
      raised
    />
  )
}

export default Host
