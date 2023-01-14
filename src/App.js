import { useEffect, useState } from "react";
import droneService from ".//services/drones.js"



function App() {
  const [droneData, setDroneData] = useState([])
  const [pilotIds, setPilotIds] = useState([])
  const [displayData, setDisplayData] = useState([])
  /*const [insideDrones, setInsideDrones] = useState()
  const [droneID, setDroneID] = useState()
  const [currentPilotData, setCurrentPilotData] = useState([])*/

  const getData = async () => {
    const datas = await droneService.getAllDrones();
    getDrones(datas)
  };

  const getBack = async () => {
    const data = await droneService.getBackData();
    console.log(data)
    setDisplayData(data)
  }
  useEffect(() => {getBack()}, [])
  
  useEffect(() => {
    const interval = setInterval(() => {
      getData()
    }, 2000)
    return () => clearInterval(interval)
  }, []);


  /*const getPilotData = async (id) => {
    const datas = await droneService.getAllPilots(id)
    console.log(!(currentPilotData.filter(i => {
      return(i.pilotId === datas.pilotId)
    }).length>0))
    if(!(currentPilotData.filter(i => i.pilotId === datas.pilotId).length>0)) {
      console.log('wtf')
      setCurrentPilotData(old => old.concat(datas))
    }
  }*/

  

  const isInside = (x, y) => {
    let square = Math.sqrt(Math.pow((x-250000), 2) + Math.pow((y-250000), 2))
    if(square < 100000) {
      return true
    }
    return false
  }

  const distanceToNest = (x, y) => {
    let square = Math.sqrt(Math.pow((x-250000), 2) + Math.pow((y-250000), 2))
    return square
  }

  const getDrones = (data) => {
    let inside = data.filter(i => {
      var x = i.getElementsByTagName("positionX")[0].value
      var y = i.getElementsByTagName("positionY")[0].value
      return (isInside(x,y))
    })
    //console.log(inside)
    let test = inside.map(i => {
      let asd = i.getElementsByTagName("serialNumber")[0].value
      var x = i.getElementsByTagName("positionX")[0].value
      var y = i.getElementsByTagName("positionY")[0].value
      var dist = distanceToNest(x,y)
      return ({
        id: asd,
        distance: dist
      })
    })
    //console.log(test, 'TEST')
    setDroneData(test)
  }



  useEffect(() => {
    if (droneData.length>0) {
        Promise.all(droneData.map((id) => droneService.getAllPilots(id.id)))
            .then((data) => {
              const dat = data
              
              //console.log(dat, 'DAT')
              let counter = 0;
              //console.log(droneData[counter].distance)
              const epic = dat.map(i => {
                counter++
                return ({pilot: i, distance: droneData[counter-1].distance})
              })
              setPilotIds(epic)
              //console.log(epic, 'EPIC')
              counter = 0
              epic.map((id) =>
                droneService.postToBack({
                  id: id.pilot.pilotId,
                  distance: id.distance,
                  firstName: id.pilot.firstName,
                  lastName: id.pilot.lastName,
                  phone: id.pilot.phoneNumber,
                  email: id.pilot.email
              })
          .then(data => console.log(data, "dataSend"))
          .catch(error => console.log(error)))
          })
            .catch((error) => console.log(error));
    }
    getBack()
}, [droneData]);

  


  //console.log(droneData, 'droneData')
  //console.log(pilotIds, 'pilotIds')
  console.log(displayData, 'DISPLAYING DATA')
  
  




  /*const getStates = (data) => {
    var inside = data.filter(i => {
      var x = i.getElementsByTagName("positionX")[0].value
      var y = i.getElementsByTagName("positionY")[0].value
      return (isInside(x,y))
    })
    var ids = inside.map(i => i.getElementsByTagName("serialNumber")[0].value)
    console.log(ids, "lol")
    if(ids.length>0) {
      ids.map(i => getPilotData(i))
      //setPilotData(oldData => [...oldData, pilots])
    }
    setInsideDrones(inside)
  }*/

  /*console.log(droneData)
  console.log(insideDrones, "inside")
  console.log(droneID)
  console.log(currentPilotData, "pilotData")*/

  /*insideDrones[0].getElementsByTagName("serialNumber")[0].value*/

  /*{pilotData.map((i) => {
          return (
            <div id={i.pilotId}>
              <p>{i.firstName} {i.lastName}</p>
              <p>{i.phoneNumber}</p>
              <p>{i.email}</p>
            </div>
          )
        })}*/

        /*
        <button onClick={()=>getStates()} style={{border: '1px solid black'}}>Hi</button>
      <button onClick={() => setDroneID(insideDrones[0].getElementsByTagName("serialNumber")[0].value)} style={{border: '1px solid black'}}>Check</button>
      <button onClick={() => getPilotData()} style={{border: '1px solid black'}}>Pilot</button>
      <div>
      { currentPilotData.length > 0 && currentPilotData.map((i) => {
          return (
            <div key={i.pilotId}>
              <p>{i.firstName} {i.lastName}</p>
              <p>{i.phoneNumber}</p>
              <p>{i.email}</p>
            </div>
          )
        })}
      </div>
        */

  
  return (
    <div className="App">
      {pilotIds.length > 0 && pilotIds.map(i => {
        return (
          <div key={i.pilot.pilotId}>
            <div>{i.pilot.firstName} {i.pilot.lastName}</div>
            <div>{i.pilot.phoneNumber}</div>
            <div>{i.distance}</div>
            <div>{i.pilot.email}</div>
          </div>
        )
      })}
      <h1>LAST 10 MINUTES</h1>
      {displayData.length > 0 && displayData.map(i => {
        return (
          <div key={i.pilotId}>
            <div>{i.firstName} {i.lastName}</div>
            <div>{i.phone}</div>
            <div>{i.distance}</div>
            <div>{i.email}</div>
          </div>
        )
      })}
    </div>
  );
}



export default App;
