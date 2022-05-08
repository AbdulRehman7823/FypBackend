const mongoose = require('mongoose');

const userSchema =  mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    userType:{type: String, required:true},
    password: { type: String, required: true },
    phone:{type: String},
    city:{type: String},
    img: { type: String },
    respondants:[{
      respondantId: { type: String}
   }],
   specialization:{type: String},
   requests:[{
    patientId: { type: String}
    }],
  doctors:[{
    doctorId:{type: String}
  }],
  doctorCustomers:[{
    patientId: { type: String}
  }],
  doctorAccepts:[{
    patientId: { type: String}
  }],
  respondantAccepts:[{
    patientId: { type: String}
  }]
  },
  
  { timestamps: true }
);


const user = mongoose.model('User', userSchema);
module.exports = user; 