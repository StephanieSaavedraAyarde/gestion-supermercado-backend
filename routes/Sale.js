const express = require("express");
const router = express.Router();
const { Product, Sale } = require("../config/config_test");

// Get all sales
router.get("/ventas", async (req, res) => {
  const snapshot = await Sale.get();
  const list = snapshot.docs.map((doc) => ({
    id_venta: doc.id,
    ...doc.data(),
  }));
  res.send(list);
});


// Add Sale - No Stock
router.post("/venta", async (req, res) => {
  let data = req.body;
  await Sale.add(data);
  res.send({ Result: "Added Successfully" });
});

// Update Sale
router.put("/ventas", async (req, res) => {
  try {
    const id_venta = req.body.id_venta;
    console.log(req.body.id_venta);
    delete req.body.id_venta;
    const data = req.body;
    await Sale.doc(id_venta).update(data);
    res.send({ Result: "Updated Successfully" });
  } catch (error) {
    console.log(error);
  }
});

// Delete sale
router.delete("/ventas", async (req, res) => {
  let id_venta = req.body.id_venta;
  console.log(req.body.id_venta);
  delete req.body.id_venta;
  let data = {
    estado: 0,
  };
  await Sale.doc(id_venta).update(data);
  res.send({ Result: "Deleted Successfully" });
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
