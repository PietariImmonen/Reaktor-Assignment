import axios from 'axios'

const getAll = async (id) => {
    const response = await axios.get(`/pilots/${id}`, {
        "Content-Type": "application/json; charset=utf-8"
    })
    return response.data
}
// eslint-disable-next-line import/no-anonymous-default-export
export default getAll