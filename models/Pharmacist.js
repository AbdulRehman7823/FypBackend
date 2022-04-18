const mongoose = require('mongoose');
const pharmacistSchema =  mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    img: { type: String },
  },
  { timestamps: true }
);

const pharmacist = mongoose.model('Pharmacist', pharmacistSchema);
module.exports = pharmacist; 