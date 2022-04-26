const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');

router.get('/',async (req, res) => { 
    let product = await Product.find();
    res.send(product);
    console.log("requested");
});

router.get('/:id',async (req, res) => {
    let id =  req.params.id;
    let product  = await Product.findById(id);
    res.send(product);
});


router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(updatedProduct);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


router.delete("/:id", async function (req, res) {

    try {
    let id = req.params.id;
    let product = await Product.findByIdAndDelete(id);
    if(!product){
      res.status(404).send({message: "This product is not available"});
    }
    return res.send(product);
    }catch (err) {
     return res.status(404).send({message:"Id is not a valid"});
    }
});

router.post('/',async (req, res)=>{

    try{
      console.log(req.body);
        let product = new Product(req.body);
        await product.save();
        return res.status(200).send(product);
    }catch(err){
        return res.status(500).send({message:"This product is invalid"});
    }
});



module.exports = router;
