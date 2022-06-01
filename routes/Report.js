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

<<<<<<< HEAD
router.get("/categoria", async (req, res) => {
  const querySnapshot = await Product.get();
  const documents = querySnapshot.docs;
  for(const doc of documents){
    categorias[doc] += doc.get('categorias');
  }

  var counts = {}
  for(var i = 0; i< categorias.length; i++) {
    var num = arr[i];
    counts[num] = counts[num] ? counts[num]+1 : 1;
  }
  console.log(keys(counts));

});
=======
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



>>>>>>> 3d4386ea6bc4f93bfd54815e2b0a699d191cfbfa

module.exports = router;