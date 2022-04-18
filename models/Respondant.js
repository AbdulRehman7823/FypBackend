const mongoose = require('mongoose');
const respondantSchema =  mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    requests:[{
        userId: { type: String}
     }],
    img: { type: String },
  },
  { timestamps: true }
);

const respondant = mongoose.model('Respondant', respondantSchema);
module.exports = respondant; 