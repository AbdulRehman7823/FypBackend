const mongoose = require('mongoose');
const productModel = mongoose.Schema({
    title: { type: String, required: true, unique: true },
    desc: { type: String },
    img: { type: String },
    categories: { type: Array },
    price: { type: Number, required: true },
    inStock: { type: Boolean },
});



const product = mongoose.model('Product', productModel);
module.exports = product;
