const mongoose = require('mongoose');
const doctorSchema =  mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    img: { type: String },
  },
  { timestamps: true }
);

const doctor = mongoose.model('Doctor', doctorSchema);
module.exports = doctor; 