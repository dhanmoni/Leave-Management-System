const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    
    name: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    students: [{
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        }
    },
    ]
  },
  { timestamps: true }
);

module.exports = Department = mongoose.model("department", schema);