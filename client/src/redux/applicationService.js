import {appContract} from '../utils/blockchain'
export const getApplications = async (_key)=> {
    return appContract.getApplicationsByStudentId(_key)
}

export const applyApplication = async (data)=> {
    const {subject, reason, start_date, end_date} = data
    return appContract.applyLeave(subject, reason, start_date, end_date).then(res=> console.log({res})).catch(err=> console.log({err}))
}
const applicationService = {
    getApplications,
    applyApplication
}

export default applicationService;