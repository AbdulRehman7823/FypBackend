const mongoose = require('mongoose');

const userSchema =  mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    userType:{type: String, required:true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone:{type: String},
    city:{type: String},
    img: { type: String },
    respondants:[{
      respondantId: { type: String}
   }],
   specialization:{type: String},
   requests:[{
    customerId: { type: String}
    }],
  doctors:[{
    doctorId:{type: String}
  }],
  doctorCustomers:[{
    customerId: { type: String}
  }]
  },
  { timestamps: true }
);


const user = mongoose.model('User', userSchema);
module.exports = user; 