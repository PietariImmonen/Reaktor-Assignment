import axios from 'axios'
//The function for fetching the data from the backend
const getAllDrones = async () => {
    const response = await axios.get("https://reaktorassignment2023.onrender.com/api/drones")
    return response.data
}



// eslint-disable-next-line import/no-anonymous-default-export
export default { getAllDrones }