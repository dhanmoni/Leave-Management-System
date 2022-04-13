const {recoverPersonalSignature} = require('@metamask/eth-sig-util')
const {bufferToHex} = require('ethereumjs-util')
const jwt = require('jsonwebtoken');

const Student = require('../models/Student');

exports.studentLogin = async (req, res) => {
    const { signature, publicKey } = req.body;
    if (!signature || !publicKey){
        return res.status(400).json({ error: 'Request should have signature and publicKey' });
    }
    console.log({signature, publicKey});

    return (
        Student.findOne({ publicKey })
        .then((student) => {
            if (!student) {
                res.status(400).send({
                    error: `student with publicKey ${publicKey} is not found in database`,
                });
                return null;
            }
            return student;
        })
        .then((student) => {
            console.log("2nd then=> ",student)
            if (!student) {
                res.status(400).send({
                    error: `student with publicKey ${publicKey} is not found in database`,
                });
                return null;
            }

            const msg = `I am signing my one-time nonce: ${student.nonce}`;

            // We now are in possession of msg, publicKey and signature. We
            // will use a helper from eth-sig-util to extract the address from the signature
            const msgBufferHex = bufferToHex(Buffer.from(msg, 'utf8'));
            const address = recoverPersonalSignature({
                data: msgBufferHex,
                sig: signature,
            });
            console.log({msg, msgBufferHex, address})

            // The signature verification is successful if the address found with
            // sigUtil.recoverPersonalSignature matches the initial publicKey
            if (address == publicKey) {
                return student;
            } else {
                res.status(401).send({
                    error: 'Signature verification failed',
                });
                return null;
            }
        })
        .then((student) => {
            console.log("3rd then=> ",student)

            if (!student) {
                res.status(400).send({
                    error: `student with publicKey ${publicKey} is not found in database`,
                });
                return null;
            }
            student.nonce = Math.floor(Math.random() * 10000);
            return student.save();
        })
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
        .catch(err=> res.status(500).send({err}))
    )
};


exports.studentRegister = async (req,res)=> {
    const { publicKey } = req.body;
    if (!publicKey){
        return res.status(400).json({ error: 'Request should have publicKey' });
    }
    // console.log({publicKey});
    console.log("hello", publicKey);
    return (
        Student.findOne({publicKey})
        .then(async student=> {
            console.log('not found');
            if(student) {
                res.status(400).json({ errors:  'Student already exists' });
                return null;
            }
            await Student.create({publicKey});
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
        }).catch(err=>{
            console.log({err})
            res.status(500).json({err})  
        })
    )
}

exports.studentCreateProfile = async (req,res)=> {
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