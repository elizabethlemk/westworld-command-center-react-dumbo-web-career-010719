import React from 'react';
import '../stylesheets/Area.css'
import HostList from './HostList'

const Area = (props) => (

  <div className='area' id={props.area.name}>
    <h3 className='labels'>{props.area.name.split(' ').map(function(word) {
    return word.replace(/[_\-]+/g, ' ').split(' ').map(function(word1) {return word1.replace(word1[0], word1[0].toUpperCase())}).join(' ')
  })}</h3>
    <HostList hosts={props.hosts.filter(host => host.active === true)}
    selectHost={props.selectHost}/>
  </div>
)

export default Area;
