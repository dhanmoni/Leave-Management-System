import axios from 'axios'


export const createUserProfile = async (userData)=> {
    console.log(userData)
    const response = await axios.post(`http://localhost:5000/api/auth/create-profile`, userData)

    if (response.data) {
        console.log(response.data)
    }
    return response.data
}

const authService = {
    createUserProfile
}

export default authService;