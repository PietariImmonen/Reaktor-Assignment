import React from 'react'
import './pilotInfo.css'
//The component for creating the container for pilot and the distance to the nest of drone, getting props data from props
const PilotInfo = ({firstName, lastName, phone, email, distance}) => {
  return (
    <div className='pilot-container'>
        <p className='pilot-text'><b>Name:</b> {firstName} {lastName}</p>
        <p className='pilot-text'><b>Email:</b> {email}</p>
        <p className='pilot-text'><b>Phone:</b> {phone}</p>
        <p className='pilot-text'><b>Closest distance to the nest:</b> {(distance/1000).toFixed(2)} <b>m</b></p>
    </div>
  )
}

export default PilotInfo