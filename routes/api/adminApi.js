const express = require("express");
const router = express.Router();
const Doctor = require("../../models/Doctor");
const Pharmacist = require("../../models/Pharmacist");
const Respondant = require("../../models/Respondant");
const Product = require("../../models/Product");

router.get("/doctors", async (req, res) => {
  try {
    let doctors = await Doctor.find();
    if (doctors.length > 0) {
      res.status(200).send(doctors);
    } else {
      res.status(400).send("There is no Doctor available");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/pharmacist", async (req, res) => {
  try {
    let pharmacist = await Pharmacist.find();
    if (pharmacist.length > 0) {
      res.status(200).send(pharmacist);
    } else {
      res.status(400).send("There is no pharmacist available");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/respondant", async (req, res) => {
  try {
    let respondant = await Respondant.find();
    if (respondant.length > 0) {
      res.status(200).send(respondant);
    } else {
      res.status(400).send("There is no respondant available");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/doctors/:id", async (req, res) => {
  try {
    let doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (doctor) {
      res.status(200).send({ message: "Doctor deleted successfully" });
    } else {
      res.status(400).send({ message: "Doctor is not available" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/pharmacist/:id", async (req, res) => {
    try {
      let pharmacist = await Pharmacist.findByIdAndDelete(req.params.id);
      if (pharmacist) {
        res.status(200).send({ message: "pharmacist deleted successfully" });
      } else {
        res.status(400).send({ message: "pharmacist is not available" });
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

  router.delete("/respondant/:id", async (req, res) => {
    try {
      let respondant = await Respondant.findByIdAndDelete(req.params.id);
      if (respondant) {
        res.status(200).send({ message: "respondant deleted successfully" });
      } else {
        res.status(400).send({ message: "respondant is not available" });
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


  module.exports = router;