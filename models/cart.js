const mongoose  =  require('mongoose');

const cartModel =  mongoose.Schema({
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true });

  

  const cart =  mongoose.model('Cart' , cartModel);
  module.exports = cart;
