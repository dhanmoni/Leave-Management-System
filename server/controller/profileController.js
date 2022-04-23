const User = require('../models/User');
const Hostel = require('../models/Hostel');
const Department = require('../models/Department');

exports.createUserProfile = async (req,res)=> {
    const { name, email, phone, hostel, department, publicKey } = req.body;
    if (!publicKey){
        return res.status(400).json({ error: 'Request should have publicKey' });
    }
    console.log(req.user.publicKey)
    console.log({publicKey, name, email, phone, department, hostel});
    return (
        User.findOne({publicKey})
        .then(user=> {
            if(!user) {
                res.status(400).json({ errors:  'user doesnot exists' });
                return null;
            }
            User.findOneAndUpdate(
                { publicKey },
                { $set: {
                    name,
                    email, 
                    phone,
                    hostel,
                    department
                } },
                { new: true }
              ).then(s=> res.json(s));
        }).catch(err=> res.status(500).json(err))
    )
}

exports.createAdminProfile = async (req,res)=> {
    const { name, email, phone, role, publicKey } = req.body;
    if (!publicKey){
        return res.status(400).json({ error: 'Request should have publicKey' });
    }
   
    console.log({publicKey, name, email, phone, role});
    return (
        User.findOne({publicKey})
        .then(user=> {
            if(!user) {
                res.status(400).json({ errors:  'user doesnot exists' });
                return null;
            }
            let newValue
            if(role == 'HOD'){
                console.log('hod profile')
                newValue = {
                    name,
                    email, 
                    phone,
                    roles: role,
                    department: req.body.department
                }
            } else if (role == 'WARDEN'){
                console.log('warden profile')
                newValue = {
                    name,
                    email, 
                    phone,
                    roles: role,
                    hostel: req.body.hostel
                }
            }
            console.log({newValue})
            User.findOneAndUpdate(
                { publicKey },
                { $set: newValue },
                { new: true }
              ).then(s=> res.json(s));
        }).catch(err=> res.status(500).json(err))
    )
}

exports.getHostels = async (req,res)=> {
        Hostel.find()
            .sort({createdAt: -1})
            .then(hostels=> res.json(hostels))
            .catch(err=> res.status(404).json({error: 'No hostel found'}))
}

exports.getDepartments = async (req,res)=> {
    Department.find()
        .sort({createdAt: -1})
        .then(depts=> res.json(depts))
        .catch(err=> res.status(404).json({error: 'No departments found'}))
}

