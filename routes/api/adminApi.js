const express = require("express");
const router = express.Router();
const User = require("../../models/User");

router.get("/doctors", async (req, res) => {
  try {
    let doctors = await User.find({userType:"doctor"},{username:1,email:1,img:1,specialization:1,city:1,phone:1});
    if (doctors.length > 0) {
      res.status(200).send(doctors);
    } else {
      res.status(400).send("There is no Doctor available");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});



router.get("/respondant", async (req, res) => {
  try {
    let respondant = await User.find({userType:"respondant"},{username:1,email:1,img:1,city:1,phone:1});
    if (respondant.length > 0) {
      res.status(200).send(respondant);
    } else {
      res.status(400).send("There is no respondant available");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});


router.get("/customers", async (req, res) => {
  try {
    let customers = await User.find({userType:"doctor"},{username:1,email:1,img:1,city:1,phone:1});
    if (customers.length > 0) {
      res.status(200).send(customers);
    } else {
      res.status(400).send("There is no customers available");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    let user = await User.findByIdAndDelete(req.params.id);
    if (user) {
      res.status(200).send({ message: "user deleted successfully" });
    } else {
      res.status(400).send({ message: "user is not available" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

  //====================
  router.get('/products',async (req, res) => { 
    try{
    let product = await Product.find();
    if(product.length == 0){
      return res.status(200).send("There is no Product")
    }else
    res.status(200).send(product);
    console.log("requested");
    }catch(e){
      res.status(400).send({message: e.message});
    }
});

router.get('/products/:id',async (req, res) => {
  try{
    let id =  req.params.id;
    let product  = await Product.findById(id);
    if(product){
        res.status(200).send(product);
    }else{
      res.status(200).send("Product with this id is not found");
    }
  }catch(e){
    res.status(400).send({message: e.message});
  }
  
});


router.put("/products/:id", async (req, res) => {
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


router.delete("/products/:id", async function (req, res) {

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

router.post('/products',async (req, res)=>{

    try{
      console.log(req.body);
        let product = new Product(req.body);
        await product.save();
        return res.status(200).send(product);
    }catch(err){
        return res.status(500).send({message:"This product is invalid"});
    }
});


router.post('/login',async (req, res)=>{
  try{
      let admin = new Product();
      await product.save();
      return res.status(200).send(product);
  }catch(err){
      return res.status(500).send({message:"This product is invalid"});
  }
})

module.exports = router;