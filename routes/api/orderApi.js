const express = require('express');
const router = express.Router();
const Product  = require('../../models/Product');

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
router.post('/create-checkout',async (req, res)=>{
    console.log("requested\n"+req.body);
  const session = await stripe.checkout.session.create({
      payment_method_types: ['card'],
      mode:"payment",
      line_items: req.body.order.products.map( (item)=>{
            const medicine =  item;
            return{ 
                price_data:{
                    currency: ['USD'],
                    product_data:{
                        name:medicine.title
                    },
                    unit_amount: medicine.price
                },
                quantity:medicine.quantity  
            }
      }) ,
    success_url:`${process.env.SERVER_URL}/success`,
    cancel_url:`${process.env.SERVER_URL}/cancel`,
  });

  res.send({url:session.url});
});

module.exports = router;
