const express = require("express");
const router = express.Router();
const { Provider, Sale, Product, User, Coupon, Customer} = require("../config/config_test");

router.get("/provider", async (req, res) => {
  try {
    const snapshot = await Provider.get();
    const total= snapshot.size;
    res.send({total});
  } 
  catch (error){
    console.log(error); 
  }
});

router.get("/product", async (req, res) => {
  try{
    const snapshot = await Product.get();
    const totalp= snapshot.size;
    res.send({totalp});
  } 
  catch(error){
    console.log(error);
  }
});

router.get("/user", async (req, res) => {
  try {
    const snapshot = await User.get();
    const total= snapshot.size;
    res.send({total});
  } 
  catch(error){
    console.log(error); 
  }
});

router.get("/coupon", async (req, res) => {
  try{
    const snapshot = await Coupon.get();
    const total= snapshot.size;
    res.send({total});
  } 
  catch(error){
    console.log(error);
  }
});

router.get("/customer", async (req, res) => {
  try{
    const snapshot = await Customer.get();
    const total= snapshot.size;
    res.send({total});
  } 
  catch(error){
    console.log(error);
  }
});

router.get("/sale", async (req, res) => {
  try{
    const snapshot = await Sale.get();
    const total= snapshot.size;
    res.send({total});
  } 
  catch(error){
    console.log(error);
  }
  
});

module.exports = router;