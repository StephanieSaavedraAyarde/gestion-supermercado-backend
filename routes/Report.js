const express = require("express");
const router = express.Router();
const { Provider, Sale, Product, User, Coupon, Customer } = require("../config/config_test");

router.get("/provider", async (req, res) => {
  try {
    const snapshot = await Provider.get();
    const total = snapshot.size;
    res.send({ total });
  } 
  catch(error){
    console.log(error);
  }
});

router.get("/product", async (req, res) => {
  try{
    const snapshot = await Product.get();
    const total = snapshot.size;
    res.send({ total });
  }
  catch(error){
    console.log(error);
  }
});

router.get("/user", async (req, res) => {
  try {
    const snapshot = await User.get();
    const total = snapshot.size;
    res.send({ total });
  } 
  catch(error){
    console.log(error);
  }
});

router.get("/coupon", async (req, res) => {
  try {
    const snapshot = await Coupon.get();
    const total = snapshot.size;
    res.send({ total });
  } 
  catch(error){
      console.log(error);
  }
});

router.get("/customer", async (req, res) => {
  try {
    const snapshot = await Customer.get();
    const total = snapshot.size;
    res.send({ total });
  } 
  catch(error){
      console.log(error);
  }
});

router.get("/sales", async (req, res) => {
  try {
    const snapshot = await Sale.get();
    const total = snapshot.size;
    res.send({ total });
  } 
  catch(error){
      console.log(error);
  }
});

router.get("/total", async (req, res) => {
  const querySnapshot = await Sale.get();
  const documents = querySnapshot.docs;
  let total = 0;
  for(const doc of documents){
      total += doc.get('total');
  }
  res.send({ total });
  console.log("TOTAL: "+total);
});

//get by date
router.get("/date", async (req, res) => {
  const snapshot = await Sale.get();
  const list = snapshot.docs.map((doc) => ({
    id_venta: doc.id,
    total:doc.data().total,
    date:doc.data().date
    
  }));
  res.send(list);
});




module.exports = router;