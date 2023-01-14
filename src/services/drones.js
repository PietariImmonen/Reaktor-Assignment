import axios from 'axios'
import XMLParser from 'react-xml-parser';

const getAllDrones = async () => {
    const response = await axios.get("/drones", {
        "Content-Type": "application/xml; charset=utf-8"
    })
    var xml = new XMLParser().parseFromString(response.data)
    return xml.getElementsByTagName('drone')
}

const getAllPilots = async (id) => {
    const response = await axios.get(`/pilots/${id}`, {
        "Content-Type": "application/json; charset=utf-8"
    })
    return response.data
}

const postToBack = async (newObject) => {
    const req = axios.post("http://localhost:3001/api/drones", newObject)
    return req.then(res => res.data)
}

const getBackData = async () => {
    const response = await axios.get("http://localhost:3001/api/drones")
    return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAllDrones, getAllPilots, postToBack, getBackData }