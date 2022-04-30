import {appContract} from '../utils/blockchain'
export const getApplications = async (_key)=> {
    const returnValue = []
    const data = await  appContract.getApplicationsByStudentId(_key)
    data.map(d=> {
        returnValue.push({
            studentKey: d.studentKey.toLowerCase(),
            subject: d.subject,
            reason: d.reason,
            startDate: d.startDate.toNumber(),
            endDate: d.endDate.toNumber(),
            approvels: d.approvels,
            approveLevel: d.approveLevel.toNumber(),
        })
    })
    // console.log({returnValue})
    const returnData = {
        [_key] : returnValue
    }
    // console.log({returnData})
    return returnData
}

export const applyApplication = async (data)=> {
    const {subject, reason, start_date, end_date} = data
    return appContract.applyLeave(subject, reason, start_date, end_date).then(res=> console.log({res})).catch(err=> console.log({err}))
}

export const rejectApplication = async (key)=> {
    return appContract.rejectLeave(key)
}

export const approveApplication = async (key)=> {
    console.log('approvong applicatuon', key)
    return appContract.grantLeave(key)
}
const applicationService = {
    getApplications,
    applyApplication,
    rejectApplication,
    approveApplication
}

export default applicationService;