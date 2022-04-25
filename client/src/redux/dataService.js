export const getHostels = async ()=> {
    return fetch(`http://localhost:5000/api/profile/get-hostels`).then(res=> res.json())
            .then(hostels=> {
                console.log({hostels})
                return hostels;
            })
}

export const getDepts = async ()=> {
    return fetch(`http://localhost:5000/api/profile/get-departments`).then(res=> res.json())
            .then(depts=> {
                console.log({depts})
                return depts;
            })
}



const dataService = {
    getDepts,
    getHostels
}

export default dataService;