import axios from 'axios'
//The function for fetching the data from the backend
const getAllDrones = async () => {
    const response = await axios.get("http://localhost:3001/")
    return response.data
}



// eslint-disable-next-line import/no-anonymous-default-export
export default { getAllDrones }