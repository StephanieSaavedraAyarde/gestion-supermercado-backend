const express = require("express");
const router = express.Router();
const {
  Provider,
  Sale,
  Product,
  User,
  Coupon,
  Customer,
} = require("../config/config_test");

router.get("/provider", async (req, res) => {
  try {
    const snapshot = await Provider.get();
    const total = snapshot.size;
    res.send({ total });
  } catch (error) {
    console.log(error);
  }
});

router.get("/product", async (req, res) => {
  try {
    const snapshot = await Product.get();
    const total = snapshot.size;
    res.send({ total });
  } catch (error) {
    console.log(error);
  }
});

router.get("/user", async (req, res) => {
  try {
    const snapshot = await User.get();
    const total = snapshot.size;
    res.send({ total });
  } catch (error) {
    console.log(error);
  }
});

router.get("/coupon", async (req, res) => {
  try {
    const snapshot = await Coupon.get();
    const total = snapshot.size;
    res.send({ total });
  } catch (error) {
    console.log(error);
  }
});

router.get("/customer", async (req, res) => {
  try {
    const snapshot = await Customer.get();
    const total = snapshot.size;
    res.send({ total });
  } catch (error) {
    console.log(error);
  }
});

router.get("/sales", async (req, res) => {
  try {
    const snapshot = await Sale.get();
    const total = snapshot.size;
    res.send({ total });
  } catch (error) {
    console.log(error);
  }
});

router.get("/total", async (req, res) => {
  const querySnapshot = await Sale.get();
  const documents = querySnapshot.docs;
  let total = 0;
  for (const doc of documents) {
    total += doc.get("total");
  }
  res.send({ total });
  console.log("TOTAL: " + total);
});

router.get("/categorias", async (req, res) => {
  const querySnapshot = await Product.get();
  const documents = querySnapshot.docs;
  var categorias = [];
  var counts = {};
  for (const doc of documents) {
    categorias.push(doc.get("categoria"));
  }
  for (var i = 0; i < categorias.length; i++) {
    console.log("Item", i, " :", categorias[i]);
    var num = categorias[i];
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }
  console.log(counts);
  res.send({ counts });
});


//get by date
router.get("/date", async (req, res) => {
  const snapshot = await Sale.get();
  const documents = snapshot.docs;
  var dates = [];
  var total = {};
  var precios = [];
  

  for (const doc of documents) {
    dates.push(doc.get("date"));
    precios.push(doc.get("total"));
    try {
      total[doc.get("date")] = total[doc.get("date")]
        ? total[doc.get("date")] + doc.get("total")
        : doc.get("total");
    } catch (error) {
      console.log(errpr);
    }
  }

  console.log(dates);
  console.log(precios);
  console.log(total);

  res.send({ total });
});

module.exports = router;


