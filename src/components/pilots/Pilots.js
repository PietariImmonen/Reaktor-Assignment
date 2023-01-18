import React from 'react'
import PilotInfo from '../pilotInfo/PilotInfo'
import './pilots.css'
//Function responsible to create every PilotInfo component with mapping the data from props
const Pilots = ({data}) => {
  return (
    <div className='pilots-container'>
        {data && data.map(i => {
            return(
                <div key={i.id}>
                    <PilotInfo firstName={i.firstName} lastName={i.lastName} email={i.email} phone={i.phone} distance={i.distance}/>
                </div>
            )
        })}
    </div>
  )
}

export default Pilots