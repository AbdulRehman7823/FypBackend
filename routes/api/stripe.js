const router = require('express').Router();
const stripe =  require('stripe')("sk_test_51KuvSGJ5s3GMFY7xzIibr4HHaFgEAiugF9pNWKZA7nrt2rdSemuLfgooccBNZ6PySxnnhkEEfUt5kCruaM6RtD9i00b31o46cp");

router.post('/create-checkout',async (req, res)=>{

    stripe.charges.create({ 
        source:req.body.tokenId, 
        mode:"payment",
        currency:"usd",
        line_items: req.body.order.map( (item)=>{
            return{ 
                price_data:{
                    currency: 'usd',
                    product_data:{
                        name:item.title
                    },
                    unit_amount: item.price
                },
                quantity:item.quantity  
            }
      })
    },
    (stripeErr,stripeRes)=>{
        if(stripeErr){
            res.status(400).json(stripeErr);
            console.log(stripeErr)
        }else{
            res.status(200).json(stripeRes);
        }
    })


   /* const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode:"payment",
      line_items: req.body.order.map( (item)=>{
            return{ 
                price_data:{
                    currency: 'usd',
                    product_data:{
                        name:item.title
                    },
                    unit_amount: item.price
                },
                quantity:item.quantity  
            }
      }) 
    success_url:`${process.env.SERVER_URL}/success`,
    cancel_url:`${process.env.SERVER_URL}/cancel`,
  });
*/
});

router.post("/payment", (req, res) => {

    stripe.charges.create({ 
        source:req.body.tokenId, 
        amount:req.body.amount, 
        currency:"usd",
    },
    (stripeErr,stripeRes)=>{
        if(stripeErr){
            res.status(500).json(stripeErr);
        }else{
            res.status(200).json(stripeRes);
        }
    })
});

module.exports = router;