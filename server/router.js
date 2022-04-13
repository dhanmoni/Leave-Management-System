const express = require('express');
const router = express.Router();

const auth = require('./routes/api/auth')

router.use('/api/auth', auth)

module.exports = router;