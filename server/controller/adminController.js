const {ethers} =  require('ethers')
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Department = require('../models/Department');
const Hostel = require('../models/Hostel');


exports.addDepartment = async (req,res)=> {
    const { name } = req.body;
    
    return (
        Department.findOne({name: name})
        .then(async dept=> {
            if(dept) {
                return res.status(400).json({ error:  'dept already exists' });
            }
            console.log('creating dept...')
            const newdept = await Department.create({name});
            return res.status(200).json(newdept);
        }).catch(err=>{
            console.log({err})
            res.status(500).json({err})  
        })
    )
}

exports.addHostel = async (req,res)=> {
    const { name } = req.body;
    
    return (
        Hostel.findOne({name: name})
        .then(async hostel=> {
            if(hostel) {
                return res.status(400).json({ error:  'Hostel already exists' });
            }
            console.log('creating Hostel...')
            const newHostel = await Hostel.create({name});
            return res.status(200).json(newHostel);
        }).catch(err=>{
            console.log({err})
            res.status(500).json({err})  
        })
    )
}

exports.approveUserAdmin = async (req,res)=> {
    const { publicKey, role, id } = req.body;
    if (!publicKey){
        return res.status(400).json({ error: 'Request should have publicKey' });
    }
    console.log({publicKey, role, id})
    return (
        User.findOne({publicKey})
        .then(user=> {
            if(!user) {
                res.status(400).json({ errors:  'user doesnot exists' });
                return null;
            }

            if(role == 'HOD'){
                console.log('hod requesting...')
                Department.findOneAndUpdate(
                    {_id: id, isActive: false}, 
                    { $set: {
                        admin: {
                            adminId: user.id,
                            adminName: user.name
                        },
                        isActive: true
                    } },
                    { new: true }
                ).then(()=> {
                    user.isApproved = true;
                    user.save();
                    return res.status(200).send({msg: 'success'})
                })
                .catch(err=> res.status(500).json(err))
              } else if(role == 'WARDEN'){
                console.log('warden requesting...')
                Hostel.findOneAndUpdate(
                    {_id: id, isActive: false}, 
                    { $set: {
                        admin: {
                            adminId: user.id,
                            adminName: user.name
                        },
                        isActive: true
                    } },
                    { new: true }
                ).then(()=> {
                    user.isApproved = true;
                    user.save();
                    return res.status(200).send({msg: 'success'})
                })
                .catch(err=> res.status(500).json(err))
              }
        }).catch(err=> res.status(500).json(err))
    )
}

exports.rejectUserAdmin = async (req,res)=> {
    const { publicKey } = req.body;
    if (!publicKey){
        return res.status(400).json({ error: 'Request should have publicKey' });
    }
    
    return (
        User.findOne({publicKey})
        .then(user=> {
            if(!user) {
                res.status(400).json({ errors:  'user doesnot exists' });
                return null;
            }
            user.remove().then(() => res.json({msg: 'succesfully deleted user'}))
        }).catch(err=> res.status(500).json(err))
    )
}

exports.approveUserStudent = async (req,res)=> {
    const { publicKey, dept_id, hostel_id } = req.body;
    if (!publicKey){
        return res.status(400).json({ error: 'Request should have publicKey' });
    }
    console.log({publicKey, dept_id, hostel_id})
    // here student = user
    return (
        User.findOne({publicKey})
        .then(student=> {
            if(!student) {
                res.status(400).json({ errors:  'student doesnot exists' });
                return null;
            }

            Department.findOne({_id: dept_id})
                .then(dept=> {
                    if(!dept){
                        res.status(400).json({ errors:  'dept doesnot exists' });
                    } else {
                        dept.students.push({
                            studentId: student.id,
                            studentName: student.name
                        })
                        dept.save()
                    }
            }).then(()=> {
                Hostel.findOne({_id: hostel_id}).then(hostel=> {
                    if(!hostel){
                        res.status(400).json({ errors:  'hostel doesnot exists' });
                    } else {
                        hostel.students.push({
                            studentId: student.id,
                            studentName: student.name
                        })
                        hostel.save()
                    }
                })
                .then(()=> {
                    student.isApproved = true;
                    student.save();
                    return res.status(200).send({msg: 'success'})
                  })
                .catch(err=> res.status(500).send(err))
            }).catch(err=> res.status(500).send(err))
        }).catch(err=> res.status(500).json(err))
    )
}


exports.rejectUserStudent = async (req,res)=> {
    const { publicKey } = req.body;
    if (!publicKey){
        return res.status(400).json({ error: 'Request should have publicKey' });
    }
    
    return (
        User.findOne({publicKey})
        .then(user=> {
            if(!user) {
                res.status(400).json({ errors:  'user doesnot exists' });
                return null;
            }
            user.remove().then(() => res.json({msg: 'succesfully deleted user'}))
        }).catch(err=> res.status(500).json(err))
    )
}