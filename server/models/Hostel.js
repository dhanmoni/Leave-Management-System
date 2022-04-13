const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    
    name: {
        type: String,
        required: true,
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin",
    },
    students: [{
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "student",
        }
    },
    ]
  },
  { timestamps: true }
);

module.exports = Hostel = mongoose.model("hostel", schema);