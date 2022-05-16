export const createUserProfile = async (userData)=> {
    console.log('posting...', userData, userData.jwt_token)
      const token = userData.get('jwt_token')
      console.log({token})
    console.log('posting2...', userData, token)
    return fetch(`http://localhost:5000/api/profile/create-profile`, {
                body: userData,
                headers: {
                    'x-auth-token': token
                },
                method: 'POST',
            }).then(res=> res.json())
            .then(data=> {
                console.log({data})
                return data;
            })
}

export const createAdminProfile = async (adminData)=> {
    console.log(adminData)
    
    return fetch(`http://localhost:5000/api/profile/create-admin-profile`, {
                body: JSON.stringify(adminData),
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': adminData.jwt_token
                },
                method: 'POST',
            }).then(res=> res.json())
            .then(data=> {
                console.log({data})
                return data;
            })
}


const authService = {
    createUserProfile,
    createAdminProfile
}

export default authService;