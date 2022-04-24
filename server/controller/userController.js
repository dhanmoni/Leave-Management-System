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

