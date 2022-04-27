const mongoose = require('mongoose');
const productModel = mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String },
    img: { type: String },
    categories: { type: Array },
    price: { type: Number, required: true },
    quantity: { type:Number, default:1},
});

const product = mongoose.model('Product', productModel);
module.exports = product;
