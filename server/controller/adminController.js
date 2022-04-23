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

exports.approveUser = async (req,res)=> {
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
            User.findOneAndUpdate(
                { publicKey: publicKey },
                { $set: {
                    isApproved: true
                } },
                { new: true }
              ).then(s=> res.json(s));
        }).catch(err=> res.status(500).json(err))
    )
}

exports.rejectUser = async (req,res)=> {
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