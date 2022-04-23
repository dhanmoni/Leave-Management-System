const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    
    name: {
        type: String,
        required: true,
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

module.exports = Hostel = mongoose.model("hostel", schema);