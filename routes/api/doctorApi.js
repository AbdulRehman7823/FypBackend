const express = require('express');
const router = express.Router();
const User = require("../../models/User");

router.get("/patients/:id",async (req, res) => {
    
    try {
        const doctor = await User.findById(req.params.id);
        if(doctor){
            const patients = doctor.doctorCustomers;
            if(patients.length>0){
                  res.status(200).send(patients);
            }else{
                return res.status(400).send({message:"There is no patients yet"});
            }
        }
    } catch (error) {
        return res.status(400).send({message:"There is some problem\n"+error.message});
    }

});


router.post("/accept/:id", async (req, res)=>{

    try {
        
        const respondant = await User.updateOne({_id:req.params.id},{$pullAll:{requests:req.body.id}});
        if(respondant){
            return res.status(200).send(respondant);
        }else{
            return res.status(404).send({message:"There is no Respondant with this id"});
        }
    } catch (error) {
        return res.status(404).send({message:"There is some problem with this request"});
    }
     
});
module.exports = router;