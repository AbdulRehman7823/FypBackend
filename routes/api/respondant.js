const { id } = require('@hapi/joi/lib/base');
const express = require('express');
const router = express.Router();
const User = require("../../models/User");
const {verifyToken}  = require('../../middlewares/authenticate')

router.get("/patients/:id",verifyToken,async (req, res) => {
    try{
        const respondant = await User.findById(req.params.id);
        if(respondant && respondant.userType=="respondant"){
           const patients = respondant.requests;
           console.log(patients)
           if(patients.length > 0){
             const records = await User.find().where('_id').in(patients).exec();
             console.log(records)
             res.status(200).send(records)
           }else{
            res.status(200).send({message:"There  is no Patient Requested to current respondant"})
           }
        }else{
          res.status(200).send({message:"There  is no respondant with this ID"})
        }
      }catch(err){
            console.log(err)
            res.status(500).send({message:"There is some Error "+err.message})
      }
});


router.get('/acceptedPatients/:id',verifyToken, async (req, res) => {
    try{
        const respondant = await User.findById(req.params.id);
        if(respondant && respondant.userType=="respondant"){
           const patients = respondant.respondantAccepts;
           console.log(patients)
           if(patients.length > 0){
             const records = await User.find().where('_id').in(patients).exec();
             console.log(records)
             res.status(200).send(records)
           }else{
            res.status(200).send({message:"No Request Accepted by the current respondant"})
           }
        }else{
          res.status(200).send({message:"There  is no respondant with this ID"})
        }
      }catch(err){
            console.log(err)
            res.status(500).send({message:"There is some Error "+err.message})
      }
})

router.post("/accept/:id", verifyToken,async (req, res)=>{

    try{
        const respondant = await User.findById(req.params.id);
        const patientId = req.body;
        
        let isExist = false;
        const respondantRequests = respondant.requests;
        await respondantRequests.map((value)=>{
            if(value.id  == patientId._id){
                isExist = true;
                return;
            }
        })

        if(!isExist){
            return res.status(200).send({message:"There is no Request From given Patient to current Respondant"})
        }else 
        if(respondant && respondant.userType=="respondant"){
           const patients = respondant.respondantAccepts;
           
             patients.push(patientId);
            await User.findByIdAndUpdate(patientId,{$pull:{respondants:{_id: req.params.id}}}).exec();
            await User.findByIdAndUpdate(respondant,{$pull:{requests:{_id: patientId._id}}}).exec();
            
            respondant.respondantAccepts = patients;
            await respondant.save();
            res.status(200).send(respondant);
        }else{
          res.status(200).send({message:"There  is no respondant with this ID"})
        }
      }catch(err){
            console.log(err)
            res.status(500).send({message:"There is some Error "+err.message})
      }
     
});

router.get('/:id',verifyToken, async (req, res) => {
    try {
        const respondant = await User.findById(req.params.id);
        if(respondant){
            res.status(200).send(respondant);
        }else{
            res.status(200).send({message:"There  is no respondant with this ID."});
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;