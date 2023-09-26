const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");

const app=express()
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.use(cors({origin:true, credentials:true}))

const stripe = require("stripe")("sk_test_51NuEUwHpVTFwinL2tkroWNqpnovIvpzw2r2bKPcjxvV9evuFETB9oJREpIxnvyxUVFgBBJj7qATARoyOhb1PMbue00zlB3fR0o");

app.post("/checkout", async(req, res, next)=>{
  try{
    const session=await stripe.checkout.sessions.create({
      line_items: [{
        price_data:{
          currency:'usd',
          product_data:{
            name: 'T-shirt',
          },
          unit_amount:2000,
        },
        quantity:1,
        },
      ],
      mode:"payment",
      success_url:"http://localhost:4242/success.html",
      cancel_url:"http://localhost:4242/cancel.html",
    });

    res.status(200).json(session);
  }catch(error){
    next(error);
  }
});

app.listen(4242, ()=>console.log("app is running on 4242"));
