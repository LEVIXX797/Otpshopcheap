const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ⚠️ SECRET yaha hi rahega (safe)
const razorpay = new Razorpay({
  key_id: "rzp_live_Sc966IkaNDTRPy",
  key_secret: "YOUR_NEW_SECRET_HERE"
});

// CREATE ORDER API
app.post("/create-order", async (req,res)=>{
  const { amount } = req.body;

  const order = await razorpay.orders.create({
    amount: amount * 100,
    currency: "INR"
  });

  res.json(order);
});

app.listen(3000,()=>console.log("Server running on 3000"));
