import { useEffect, useState } from "react";
import droneService from ".//services/drones.js"
import Pilots from "./components/pilots/Pilots.js";


//Function that gatheres every component for the app.
function App() {
  const [droneData, setDroneData] = useState()
  //Function for getting the data from the backEnd to front end
  const getData = async () => {
    const datas = await droneService.getAllDrones();
    setDroneData(datas)
  };
  //Doing the getData function every 2 seconds
  useEffect(() => {
    getData()
    setInterval(getData, 2000)}, [])

  return (
    <div className="App">
      <Pilots data={droneData}/>
    </div>
  );
}



export default App;
