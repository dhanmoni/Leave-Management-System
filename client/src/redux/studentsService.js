export const getStudentsByHostel = async (userData)=> {
    console.log(userData)
    
    return fetch(`http://localhost:5000/api/users/get-students-hostels/${userData.id}`, {
                headers: {
                    'x-auth-token': userData.jwt_token
                }
            }).then(res=> res.json())
            .then(data=> {
                console.log({data})
                return data;
            })
}

export const getStudentsByDept = async (userData)=> {
    console.log(userData)
    
    return fetch(`http://localhost:5000/api/users/get-students-departments/${userData.id}`, {
                headers: {
                    'x-auth-token': userData.jwt_token
                }
            }).then(res=> res.json())
            .then(data=> {
                console.log({data})
                return data;
            })
}

export const getAllStudents = async (userData)=> {
    console.log(userData)
    
    return fetch(`http://localhost:5000/api/users/get-students`, {
                headers: {
                    'x-auth-token': userData.jwt_token
                }
            }).then(res=> res.json())
            .then(data=> {
                console.log({data})
                return data;
            })
}

export const approveStudent = async (userData)=> {
    
    console.log("approving...", userData)
    return fetch(`http://localhost:5000/api/admin/approve-user-student`, {
                body: JSON.stringify(userData),
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': userData.jwt_token
                },
                method: 'POST'
            }).then(res=> res.json())
            .then(data=> {
                console.log({data})
                return data;
            })
}

export const rejectStudent = async (userData)=> {
    
    console.log("rejecting...", userData)
    return fetch(`http://localhost:5000/api/admin/reject-user-student`, {
                body: JSON.stringify(userData),
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': userData.jwt_token
                },
                method: 'POST'
            }).then(res=> res.json())
            .then(data=> {
                console.log({data})
                return data;
            })
}


const studentsService = {
    getStudentsByDept,
    getStudentsByHostel,
    approveStudent,
    rejectStudent,
    getAllStudents
}

export default studentsService;