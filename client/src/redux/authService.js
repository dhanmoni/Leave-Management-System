export const createUserProfile = async (userData)=> {
    console.log(userData)
    
    return fetch(`http://localhost:5000/api/profile/create-profile`, {
                body: JSON.stringify(userData),
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': userData.jwt_token
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