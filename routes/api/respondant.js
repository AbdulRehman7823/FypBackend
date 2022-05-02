const express = require('express');
const router = express.Router();
const User = require("../../models/User");

router.get("/requests/:id",async (req, res) => {
    
    try {
        const respondant = await User.findById(req.params.id);
        if(respondant){
            const requests = respondant.requests;
            if(requests.length>0){
                  res.status(200).send(requests);
            }else{
                return res.status(400).send({message:"There is no request yet"});
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