import axios from 'axios'

const API_URL = "http://localhost:5000"

export const register = async (publicKey)=> {
    console.log('register user called', publicKey)
    const res = await axios.post(`${API_URL}/api/auth/student-reg`, {publicKey})
    return res;   
}

export const getStudent = async (publicKey)=> {
    console.log('getting student...', publicKey)
    const res = await axios.get(`${API_URL}/api/auth/get-student/${publicKey}`)
    return res
}

const authService = {
    register,
    getStudent
}

export default authService;