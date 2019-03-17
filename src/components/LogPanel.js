import React from 'react'
import { Segment, Button } from 'semantic-ui-react';
import { Log } from '../services/Log'

const LogPanel = (props) => {

  const handleClick = () => {
    props.toggleActivated()
    if (props.activated) {
      props.decommissionAll()
    } else {
      props.activateAll()
    }
  }

  return(
    <Segment className="HQComps" id="logPanel">
      <pre>
        { props.log.map((log, index) =>
          <p key={index} className={log.type}>{log.msg}</p>
          )
        }
      </pre>
      <Button
        fluid
        color={props.activated ? "green" : "red"}
        content={props.activated ? "DECOMMISSION ALL" : "ACTIVATE ALL"}
        onClick={handleClick}
      />

    </Segment>
  )
}

export default LogPanel
