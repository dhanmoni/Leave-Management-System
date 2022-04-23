const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    publicKey:{
        type: String,
        required: true,
        unique: true,
    },
    nonce: {
        type: Number,
        default: () => Math.floor(Math.random() * 1000000) // Initialize with a random nonce
    },
    name: {
        type: String,
    },
    email:{
        type: String,
    },
    phone:{
        type: String,
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
    roles: {
        type: [{
            type: String,
            enum: ['STUDENT', 'HOD', 'WARDEN', 'SYSTEM_ADMIN']
        }],
        default: ['STUDENT']
    },
    department: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "department",
        },
        name: {
            type: String
        }
    },
    hostel: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "hostel",
        },
        name: {
            type: String
        }
    },
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("user", schema);