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
        required: true,
    },
    email:{
        type: String,
    },
    phone:{
        type: String,
    },
    roles: {
        type: [{
            type: String,
            enum: ['HOD', 'WARDEN', 'SYSTEM_ADMIN']
        }],
        default: ['WARDEN']
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "department",
    },
    hostel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "hostel",
    },
  },
  { timestamps: true }
);

module.exports = Admin = mongoose.model("admin", schema);