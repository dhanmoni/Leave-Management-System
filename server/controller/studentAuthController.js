const {recoverPersonalSignature} = require('@metamask/eth-sig-util')
const {bufferToHex} = require('ethereumjs-util')
const {ethers} =  require('ethers')
const jwt = require('jsonwebtoken');

const Student = require('../models/Student');

exports.studentAuth = async (req, res) => {
    console.log('In student auth backend')
    const { signature, publicKey } = req.body;
    if (!signature || !publicKey){
        return res.status(400).json({ error: 'Request should have signature and publicKey' });
    }
    console.log({signature, publicKey});

    return (
        Student.findOne({ publicKey })
        .then((student) => {
            if (!student) {
                throw new Error('404');            }
            return student;
        })
        ////////////////////////////////////////////////////
        // Step 2: Verify digital signature
        ////////////////////////////////////////////////////
        .then((student) => {
            console.log("2nd then=> ",student)
            if (!student) {
                throw new Error('404');   
            }

            const msg = `I am signing my one-time nonce: ${student.nonce}`;

            const address = ethers.utils.verifyMessage(msg, signature)
           
            // The signature verification is successful if the address found with
            // ethers.utils.verifyMessage matches the initial publicKey
            if (address.toLowerCase() == publicKey) {
                return student;
            } else {
                return null;
            }
        })
        ////////////////////////////////////////////////////
        // Step 3: Generate a new nonce for the user
        ////////////////////////////////////////////////////
        .then((student) => {
            console.log("3rd then=> ",student)

            if (!student) {
                throw new Error('401');   
            }
            console.log('hello')
            student.nonce = Math.floor(Math.random() * 10000);
            return student.save();
        })
        ////////////////////////////////////////////////////
        // Step 4: Create JWT
        ////////////////////////////////////////////////////
        .then(() => {
            const payload = {
                publicKey,
            };
            jwt.sign(
                payload,
                'shhhh',
                { expiresIn: '7 days' },
                (err, token) => {
                if (err) throw err;
                return res.json({ token });
                }
            );
        })
        .catch( (err) => {
            if (err.message === '404') {
                res.status(404).json({
                    message: `student with publicKey ${publicKey} doesnot exists`
                })
            } 
            else if (err.message === '401') {
                res.status(404).json({
                    message: `student verification failed`
                })
            } else {
                res.status(500).json({
                    error: err
                })
            }
        })
    )
};


exports.createStudent = async (req,res)=> {
    console.log('registering...', req.body.publicKey)
    const { publicKey } = req.body;
    if (!publicKey){
        return res.status(400).json({ error: 'Request should have publicKey' });
    }
    // console.log({publicKey});
    console.log("hello", publicKey);
    return (
        Student.findOne({publicKey})
        .then(async student=> {
            console.log('found');
            if(student) {
                return res.status(400).json({ error:  'Student already exists' });
            }
            console.log('creating...')
            const newStudent = await Student.create({publicKey});
            return res.status(200).json(newStudent);
        }).catch(err=>{
            console.log({err})
            res.status(500).json({err})  
        })
    )
}

exports.getStudentByPublicKey = async (req, res)=> {
    console.log('public key param:', req.params)
    const { publicKey } = req.params;
    if (!publicKey){
        return res.status(400).json({ error: 'Request should have publicKey' });
    }

    return (
        Student.findOne({publicKey})
        .then(async student=> {
            
            if(student) {
                return res.json(student);
            } else {
                return res.json(null);
            }
            
        }).catch(err=>{
            console.log({err})
            res.status(500).json({err})  
        })
    )
}


exports.createStudentProfile = async (req,res)=> {
    const { name, email, phone, publicKey } = req.body;
    if (!publicKey){
        return res.status(400).json({ error: 'Request should have publicKey' });
    }
    console.log({publicKey, name, email, phone});
    return (
        Student.findOne({publicKey})
        .then(student=> {
            if(!student) {
                res.status(400).json({ errors:  'Student doesnot exists' });
                return null;
            }
            Student.findOneAndUpdate(
                { publicKey: publicKey },
                { $set: {
                    name,
                    email, 
                    phone
                } },
                { new: true }
              ).then(s=> res.json(s));
        }).catch(err=> res.status(500).json(err))
    )
}