const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config();
const router = require('./router')

const app = express()

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// setting up cors, headers
app.use(cors());

//connect to mongodb
mongoose.connect(process.env.MONGODB_ATLAS_URI,
    err => {
        if(err) throw err;
        console.log('connected to MongoDB')
    }
);

// port
const port = process.env.PORT || 5000;

app.use(router);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});