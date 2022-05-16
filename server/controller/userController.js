const User = require('../models/User');

exports.getStudentByHostels = async (req,res)=> {
    console.log(req.params)
    const {id} = req.params;
    User.find({'hostel.id': id, roles: 'STUDENT'})
        .sort({createdAt: -1})
        .then(students=> res.json(students))
        .catch(err=> res.status(404).json({error: 'No students found'}))
}

exports.getStudentsByDepartments = async (req,res)=> {
    const {id} = req.params;
    User.find({'department.id': id, roles: 'STUDENT'})
        .sort({createdAt: -1})
        .then(students=> res.json(students))
        .catch(err=> res.status(404).json({error: 'No students found'}))
}

exports.getAllStudents = async (req,res)=> {
    User.find({ roles: 'STUDENT'})
        .sort({createdAt: -1})
        .then(students=> res.json(students))
        .catch(err=> res.status(404).json({error: 'No students found'}))
}

exports.getAllLocalGuardians = async (req,res)=> {
    User.find({ roles: 'LOCAL_GUARDIAN'})
        .sort({createdAt: -1})
        .then(localGuardian=>{
            console.log('getting data', localGuardian)
            return res.json(localGuardian)})
        .catch(err=> res.status(404).json({error: 'No local guardian found'}))
}

exports.getAllProjectGuides = async (req,res)=> {
    User.find({ roles: 'PROJECT_GUIDE'})
        .sort({createdAt: -1})
        .then(projectGuide=> res.json(projectGuide))
        .catch(err=> res.status(404).json({error: 'No project guide found'}))
}

